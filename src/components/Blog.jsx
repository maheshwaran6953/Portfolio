import './Blog.css';

export function Blog() {
    return (
        <article className="blog active">
            <header>
                <h1 className="h2 article-title">Blog</h1>
            </header>

            <section className="blog-posts">
                <div className="blog-coming-soon">
                    <div className="blog-coming-soon-icon">✍️</div>
                    <h3 className="h3">Coming Soon</h3>
                    <p>
                        I'm currently working on my Fintech blog. Stay tuned for articles
                        on financial technology, software development, and more.
                    </p>
                </div>
            </section>
        </article>
    );
}
