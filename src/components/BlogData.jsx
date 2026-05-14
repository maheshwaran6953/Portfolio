// BlogData.jsx
import vanguardCover from '../assets/project_vanguard.png';

export const BlogPosts = [
    {
        id: 1,
        title: "How I Built an Enterprise-Grade B2B Invoice Financing Platform — and What It Taught Me About Senior Engineering",
        subtitle: "A deep-dive into the architecture, engineering decisions, and hard-won lessons from building the Vanguard Settlement Engine.",
        date: "May 14, 2026",
        category: "Engineering",
        image: vanguardCover,
        readTime: "12 min read",
        slug: "building-vanguard-settlement-engine",
        content: [
            {
                type: "paragraph",
                text: "Indian SMEs collectively wait billions of dollars in unpaid invoices every year. A supplier delivers goods, issues a ₹10,00,000 invoice, and then waits 90 days to be paid. During that window, they cannot hire, cannot restock, and cannot take new orders. Traditional banks require 7–14 days and three years of ITR filings just to begin the process."
            },
            {
                type: "paragraph",
                text: "This is the problem the **Vanguard Settlement Engine** was built to solve: advance funds against buyer-approved invoices within hours, using automated risk assessment and Virtual Account Number (VAN) orchestration to make the entire process safe for the platform."
            },
            {
                type: "paragraph",
                text: "What started as a portfolio project became something more interesting — a lesson in what separates a CRUD application from a financial-grade system, and what it actually means to engineer at a senior level."
            },
            {
                type: "heading",
                level: 2,
                text: "The Problem Worth Solving"
            },
            {
                type: "paragraph",
                text: "Indian SMEs collectively wait billions of dollars in unpaid invoices every year. A supplier delivers goods, issues a ₹10,00,000 invoice, and then waits 90 days to be paid. During that window, they cannot hire, cannot restock, and cannot take new orders. Traditional banks require 7–14 days and three years of ITR filings just to begin the process."
            },
            {
                type: "heading",
                level: 2,
                text: "Starting With \"Why\" Before \"What\""
            },
            {
                type: "paragraph",
                text: "The first decision was to treat this as a real product problem, not a coding exercise. Before writing a single line of code, I spent time on the business logic:"
            },
            {
                type: "list",
                items: [
                    "Why do SMEs face this problem? (90-day payment cycles are standard in B2B)",
                    "Who are the actors? (Supplier, Buyer, Platform)",
                    "What could go wrong? (Fraud, double-payment, buyer default)",
                    "What guarantees must the platform make? (No double-disbursement, full audit trail, reversible errors)"
                ]
            },
            {
                type: "paragraph",
                text: "This thinking shaped every architectural decision that followed."
            },
            {
                type: "heading",
                level: 2,
                text: "The Architecture: Three Layers That Matter"
            },
            {
                type: "paragraph",
                text: "The platform is built around three core services, each with a distinct responsibility:"
            },
            {
                type: "heading",
                level: 3,
                text: "1. The Invoice Service — State Machine as Business Logic"
            },
            {
                type: "paragraph",
                text: "An invoice is not just a database record. It has a lifecycle:"
            },
            {
                type: "code",
                language: "text",
                code: "DRAFT → SUBMITTED → BUYER_APPROVED → FINANCING_REQUESTED → FUNDED → REPAID\n                                                          ↘ DEFAULTED\n                         (any pre-funded state) → CANCELLED"
            },
            {
                type: "paragraph",
                text: "The key insight was to encode this lifecycle as an **enforced state machine**, not just a column update. Every transition is validated before the database is touched:"
            },
            {
                type: "code",
                language: "typescript",
                code: "const VALID_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {\n  DRAFT:               ['SUBMITTED', 'CANCELLED'],\n  SUBMITTED:           ['BUYER_APPROVED', 'CANCELLED'],\n  BUYER_APPROVED:      ['FINANCING_REQUESTED', 'CANCELLED'],\n  FINANCING_REQUESTED: ['FUNDED', 'CANCELLED'],\n  FUNDED:              ['REPAID', 'DEFAULTED'],\n  REPAID:              [],   // terminal\n  DEFAULTED:           [],   // terminal\n  CANCELLED:           [],   // terminal\n};"
            },
            {
                type: "paragraph",
                text: "An attempt to jump from `DRAFT` to `FUNDED` returns `409 INVALID_TRANSITION` before a single SQL statement executes. The state machine was extracted into its own module and covered with 34 unit tests — every valid path, every invalid skip, every terminal state rejection."
            },
            {
                type: "heading",
                level: 3,
                text: "2. The VAN Service — Financial Correctness Under Concurrency"
            },
            {
                type: "paragraph",
                text: "Virtual Account Numbers are the platform's \"financial bridge.\" Each invoice gets a unique virtual bank account. When the buyer pays into that account, the platform intercepts the payment, reconciles the debt, and releases the net amount to the supplier."
            },
            {
                type: "paragraph",
                text: "The hard problem here is **webhook idempotency**. Bank payment notifications are unreliable — they fire twice, arrive out of order, and retry on timeout. A naive implementation would double-credit the supplier."
            },
            {
                type: "paragraph",
                text: "The solution was **defence-in-depth with two independent guards**:"
            },
            {
                type: "paragraph",
                text: "**Layer 1 — Application check (before the transaction):**"
            },
            {
                type: "code",
                language: "typescript",
                code: "const existingEntries = await this.vanRepo.getLedgerEntries(van.id);\nconst isDuplicate = existingEntries.some(\n  (e) => e.idempotency_key === cmd.idempotency_key\n);\nif (isDuplicate) throw new DuplicatePaymentError(cmd.idempotency_key);"
            },
            {
                type: "paragraph",
                text: "**Layer 2 — Database constraint (inside the transaction):**"
            },
            {
                type: "code",
                language: "sql",
                code: "idempotency_key TEXT NOT NULL UNIQUE"
            },
            {
                type: "paragraph",
                text: "If two concurrent webhooks pass Layer 1 simultaneously, only one INSERT succeeds. The other receives PostgreSQL error `23505`, caught and returned as 200 to the bank — preventing infinite retries."
            },
            {
                type: "paragraph",
                text: "Also notable: all monetary amounts are stored as `BIGINT` in paise (smallest currency unit). Never `FLOAT`. `0.1 + 0.2 = 0.30000000000000004` in IEEE 754 — in a ledger, that is a compliance defect."
            },
            {
                type: "heading",
                level: 3,
                text: "3. The Risk Engine — Pure Functions for Financial Safety"
            },
            {
                type: "paragraph",
                text: "Before the platform commits capital, every invoice passes three independent verification layers:"
            },
            {
                type: "paragraph",
                text: "**Three-Way Match** — compares the Invoice amount against the Purchase Order and Delivery Receipt within ±2% variance. This is a hard gate. A fabricated invoice without a corresponding PO cannot clear this check regardless of the buyer's credit score."
            },
            {
                type: "paragraph",
                text: "**Anomaly Detection** — evaluates signals like sudden invoice amount spikes (a supplier who normally invoices ₹50,000 suddenly submitting ₹5,000,000), suspiciously short payment terms, and buyer default history. Signals are scored additively."
            },
            {
                type: "paragraph",
                text: "**Buyer Risk Score** — a composite 0–100 score from default history, credit utilisation against the platform limit, and recency of last payment. Scores above 75 trigger auto-rejection."
            },
            {
                type: "paragraph",
                text: "The architectural decision that made this testable: **the entire risk engine is a pure function**."
            },
            {
                type: "code",
                language: "typescript",
                code: "function assessInvoiceRisk(cmd: AssessInvoiceRiskCommand): RiskAssessmentResult"
            },
            {
                type: "paragraph",
                text: "No database calls. No external API calls. No side effects. Same input always produces same output. This means the complete scoring logic — including edge cases, threshold boundaries, and multi-signal accumulation — can be verified with unit tests that run in under 500ms with zero infrastructure."
            },
            {
                type: "heading",
                level: 2,
                text: "Event Sourcing: The Compliance Layer"
            },
            {
                type: "paragraph",
                text: "Every state change on every invoice writes an immutable event before updating the status column. Both writes happen in a single `BEGIN/COMMIT` transaction:"
            },
            {
                type: "code",
                language: "sql",
                code: "-- The database physically enforces immutability\nREVOKE UPDATE, DELETE ON invoice_events FROM PUBLIC;"
            },
            {
                type: "paragraph",
                text: "This is not a coding convention — it is enforced at the storage engine level. Even a developer with direct database access cannot alter the audit history."
            },
            {
                type: "paragraph",
                text: "Why does this matter? Fintech platforms operate in regulated environments. If an auditor asks \"why was invoice INV-2026-001 funded?\", the complete decision trail — three-way match result, anomaly score, buyer risk score, actor identity, timestamp — is recoverable from the event log. This is not possible with a traditional \"update the status column\" approach."
            },
            {
                type: "paragraph",
                text: "The event store also serves as a reconciliation tool. Every actor who touched an invoice, every decision that was made, and every state transition is recoverable in order."
            },
            {
                type: "heading",
                level: 2,
                text: "The Async Infrastructure"
            },
            {
                type: "paragraph",
                text: "Some operations are too slow or too unreliable to run synchronously inside an HTTP request:"
            },
            {
                type: "list",
                items: [
                    "Email delivery can take 200ms–2s and fails if the mail server is temporarily unavailable",
                    "PDF generation (PDFKit) renders synchronously on the CPU thread, blocking the event loop for 50–200ms",
                    "Credit bureau checks (planned) are rate-limited external APIs"
                ]
            },
            {
                type: "paragraph",
                text: "The solution is **BullMQ + Redis**, with workers running as completely independent Node.js processes from the HTTP server."
            },
            {
                type: "code",
                language: "text",
                code: "HTTP Request\n     ↓\nService Layer → enqueue job → return 201 immediately\n                    ↓\n              Redis (job store)\n                    ↓\n              Worker Process (separate Node.js process)\n                    ↓\n              Email sent / PDF generated"
            },
            {
                type: "paragraph",
                text: "This means:"
            },
            {
                type: "list",
                items: [
                    "A slow email send never blocks an HTTP response",
                    "Worker crashes do not affect HTTP serving",
                    "Workers can be scaled independently of the HTTP server",
                    "Failed jobs are retained for 7 days with full payload, retried with exponential backoff, and inspectable via admin endpoints without Redis CLI access"
                ]
            },
            {
                type: "paragraph",
                text: "The retry policy — 3 attempts, exponential backoff, dead letter queue — was designed after testing what failure modes actually exist in production SMTP environments."
            },
            {
                type: "heading",
                level: 2,
                text: "Security: Layers That Mean Something"
            },
            {
                type: "paragraph",
                text: "Security on this platform was not an afterthought. Each layer was chosen to address a specific threat:"
            },
            {
                type: "paragraph",
                text: "**JWT + RBAC** — role-bearing tokens so `actor_id` in every audit event is cryptographically verified, not a value the caller supplied. A supplier cannot approve their own invoice — enforced at the route guard level before the service layer is reached."
            },
            {
                type: "paragraph",
                text: "**Webhook HMAC-SHA256** — `POST /vans/webhook/payment` is authenticated via `HMAC-SHA256(secret, raw_body)` using `crypto.timingSafeEqual` for comparison. The raw body is captured before `express.json()` parses it — a non-trivial implementation detail."
            },
            {
                type: "paragraph",
                text: "**HTTP Idempotency Keys** — `POST /invoices` supports the `Idempotency-Key` header, stored durably in PostgreSQL. A supplier's app that times out and retries gets the cached response without creating a duplicate invoice."
            },
            {
                type: "paragraph",
                text: "**Rate Limiting** — login attempts are limited to 5 per 15 minutes per IP+email combination. The email dimension prevents an attacker from rotating IP addresses to target a single account."
            },
            {
                type: "paragraph",
                text: "**helmet.js** — 14 HTTP security headers in one line, including `Content-Security-Policy: default-src 'none'` (this is a JSON API — it should serve nothing), `Strict-Transport-Security` with preload, and `X-Frame-Options: DENY`."
            },
            {
                type: "heading",
                level: 2,
                text: "Observability: The On-Call Engineer's Perspective"
            },
            {
                type: "paragraph",
                text: "The observability layer was designed around a specific scenario: it is 2am, something is wrong, and you have 5 minutes to find the cause."
            },
            {
                type: "paragraph",
                text: "The solution is **trace-log correlation**:"
            },
            {
                type: "code",
                language: "json",
                code: "{\n  \"level\": \"error\",\n  \"component\": \"VanService\",\n  \"trace_id\": \"4bf92f3577b34da6a3ce929d0e0e4736\",\n  \"span_id\": \"00f067aa0ba902b7\",\n  \"invoice_id\": \"3f2a...\",\n  \"err\": \"insert or update on table virtual_accounts...\",\n  \"msg\": \"Failed to create VAN\"\n}"
            },
            {
                type: "paragraph",
                text: "Every log line carries the OpenTelemetry `trace_id` of the active request via a pino mixin. In an incident: paste the `trace_id` into Jaeger to see the full distributed trace with PostgreSQL query timing — paste it into your log aggregator to see the human-readable narrative. One ID connects both."
            },
            {
                type: "paragraph",
                text: "The initialisation order matters here. OpenTelemetry patches Node.js module internals at load time. If Express or pg loads before the SDK initialises, those modules are unpatched and never traced. This is enforced structurally: the server entry point imports the tracing module first, before any application code."
            },
            {
                type: "heading",
                level: 2,
                text: "What Makes This \"Enterprise Level\""
            },
            {
                type: "paragraph",
                text: "After building this, I can articulate the difference between a tutorial project and a financial-grade system. It is not the feature set — it is the engineering discipline around correctness:"
            },
            {
                type: "paragraph",
                text: "**Transactional integrity** — every multi-table write uses `BEGIN/COMMIT/ROLLBACK`. Status updates and event appends always succeed or fail together. The database is never left in a half-written state."
            },
            {
                type: "paragraph",
                text: "**Deterministic behaviour under failure** — the saga pattern for distributed state changes means the system fails safely. Compensating transactions roll back partial work."
            },
            {
                type: "paragraph",
                text: "**Physical enforcement over convention** — `REVOKE UPDATE, DELETE` on the event store, `UNIQUE` constraints on idempotency keys, `CHECK (amount_cents > 0)` on ledger amounts. The database enforces invariants that code might accidentally violate."
            },
            {
                type: "paragraph",
                text: "**Testability at the architecture level** — the risk engine is a pure function because testability was a design requirement, not an afterthought. The repository pattern exists so services can be tested without a real database. The DI container exists so dependencies can be swapped without touching business logic."
            },
            {
                type: "paragraph",
                text: "**Documentation as engineering output** — seven Architecture Decision Records document not just *what* was built but *why*, including alternatives considered and their trade-offs. ADRs are what allow a new engineer to understand the system without a 2-hour onboarding session."
            },
            {
                type: "heading",
                level: 2,
                text: "Key Learnings"
            },
            {
                type: "paragraph",
                text: "**Money representation is not trivial.** Using `FLOAT` for currency is a bug waiting to happen. Every amount in this system is `BIGINT` in paise. Displaying rupees is an application-layer concern, not a storage concern."
            },
            {
                type: "paragraph",
                text: "**Pure functions are worth designing for.** The risk engine being a pure function was a deliberate architectural decision. It made testing trivial and business logic readable. Mixing I/O with computation is the single biggest source of complexity in financial systems."
            },
            {
                type: "paragraph",
                text: "**The audit log is your compliance strategy.** Building the event store from day one, with physical immutability enforced at the database level, means there is never a \"we need to add audit logging\" sprint before go-live."
            },
            {
                type: "paragraph",
                text: "**Idempotency is a first-class requirement, not an edge case.** Building it into the VAN ledger and the HTTP layer from the beginning is dramatically easier than retrofitting it after users encounter duplicate charges."
            },
            {
                type: "paragraph",
                text: "**The worker process separation is load-bearing.** Running background jobs in the same process as the HTTP server seems simpler until the PDF generator blocks the event loop during a load spike and response times triple. The architectural separation is worth the operational complexity."
            },
            {
                type: "heading",
                level: 2,
                text: "What I Would Build Next"
            },
            {
                type: "paragraph",
                text: "Given another sprint, the priority would be:"
            },
            {
                type: "paragraph",
                text: "**Redis-backed idempotency keys** — the current implementation uses PostgreSQL for durability, which is correct for the MVP. At scale, the SELECT+INSERT on every `POST /invoices` adds latency. Redis with a 24-hour TTL would eliminate this while the repository interface makes the migration transparent to the service layer."
            },
            {
                type: "paragraph",
                text: "**Async credit bureau integration** — the `risk.queue` is already defined in BullMQ. Plugging in a real credit bureau API (CIBIL Commercial, Experian Business) would make the buyer risk score data-driven rather than heuristic."
            },
            {
                type: "paragraph",
                text: "**BatchSpanProcessor for OpenTelemetry** — the current `SimpleSpanProcessor` exports spans synchronously, adding latency per request in production. The `BatchSpanProcessor` buffers and exports asynchronously with no impact on request latency."
            },
            {
                type: "paragraph",
                text: "**Kubernetes Helm charts** — the docker-compose setup is correct for development. A production deployment would split the HTTP server, worker, and migration runner into separate Deployments with independent replica counts and resource limits."
            },
            {
                type: "heading",
                level: 2,
                text: "The Repository"
            },
            {
                type: "paragraph",
                text: "The complete source code, including all ADRs, the Postman collection, the OpenAPI spec, and the migration files, is available at:"
            },
            {
                type: "paragraph",
                text: "**https://github.com/maheshwaran6953/vanguard-settlement-engine**"
            },
            {
                type: "paragraph",
                text: "The README covers setup in under 5 minutes. `docker-compose up -d` starts all services. `npm run dev` starts the server. The Swagger UI at `/docs` makes the API immediately explorable without Postman."
            },
            {
                type: "paragraph",
                text: "*Built with Node.js, TypeScript, PostgreSQL, Redis, BullMQ, OpenTelemetry, and a lot of deliberate thinking about what could go wrong.*"
            }
        ]
    }
];
