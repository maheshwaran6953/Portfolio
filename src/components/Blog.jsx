import { useState } from 'react';
import './Blog.css';
import { BlogPosts } from './BlogData';
import { BlogPost } from './BlogPost';

export function Blog() {
    const [selectedPost, setSelectedPost] = useState(null);

    if (selectedPost) {
        return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }

    return (
        <article className="blog active">
            <header>
                <h1 className="h2 article-title">Blog</h1>
            </header>

            <section className="blog-posts">
                <ul className="blog-posts-list">
                    {BlogPosts.map((post) => (
                        <li className="blog-post-item" key={post.id}>
                            <button onClick={() => setSelectedPost(post)}>
                                <figure className="blog-banner-box">
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                </figure>

                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <p className="blog-category">{post.category}</p>
                                        <span className="dot"></span>
                                        <time dateTime={post.date}>{post.date}</time>
                                    </div>

                                    <h3 className="h3 blog-item-title">{post.title}</h3>

                                    <p className="blog-text">
                                        {post.subtitle}
                                    </p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}
