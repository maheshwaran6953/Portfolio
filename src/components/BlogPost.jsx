import './Blog.css';

export function BlogPost({ post, onBack }) {
    if (!post) return null;

    return (
        <article className="blog-post-detail active">
            <header>
                <button className="back-btn" onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Blog
                </button>
                <h1 className="h2 article-title">{post.title}</h1>
            </header>

            <div className="blog-detail-meta">
                <span className="blog-category">{post.category}</span>
                <span className="dot"></span>
                <time dateTime={post.date}>{post.date}</time>
                <span className="dot"></span>
                <span className="read-time">{post.readTime}</span>
            </div>

            <figure className="blog-detail-banner">
                <img src={post.image} alt={post.title} />
            </figure>

            <div className="blog-detail-content">
                {post.content.map((item, index) => {
                    switch (item.type) {
                        case 'heading':
                            const Tag = `h${item.level}`;
                            return <Tag key={index} className={`h${item.level} blog-content-heading`}>{item.text}</Tag>;
                        case 'paragraph':
                            // Handle bold text and inline code in paragraph
                            const formattedText = item.text.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, i) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                                }
                                if (part.startsWith('`') && part.endsWith('`')) {
                                    return <code key={i}>{part.slice(1, -1)}</code>;
                                }
                                return part;
                            });
                            return <p key={index} className="blog-content-text">{formattedText}</p>;
                        case 'list':
                            return (
                                <ul key={index} className="blog-content-list">
                                    {item.items.map((listItem, liIndex) => (
                                        <li key={liIndex}>{listItem}</li>
                                    ))}
                                </ul>
                            );
                        case 'code':
                            return (
                                <div key={index} className="blog-content-code-wrapper">
                                    <div className="code-header">
                                        <span>{item.language}</span>
                                    </div>
                                    <pre className="blog-content-code">
                                        <code>{item.code}</code>
                                    </pre>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </article>
    );
}
