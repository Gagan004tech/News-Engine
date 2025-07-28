import React from "react";

function ArticleList({ articles, liked, onLike }) {
  return (
    <div>
      <h2>All Articles</h2>
      {articles.length === 0 && <p>No articles yet.</p>}
      <ul>
        {articles.map((a) => (
          <li key={a.id} style={{ marginBottom: 10 }}>
            <strong>{a.title}</strong> ({a.category})<br />
            <small>{a.published_at} | {a.source}</small><br />
            <a href={a.url} target="_blank" rel="noopener noreferrer">Read more</a><br />
            <button
              onClick={() => onLike(a.id)}
              disabled={liked.includes(a.id)}
            >
              {liked.includes(a.id) ? "Liked" : "Like"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList; 