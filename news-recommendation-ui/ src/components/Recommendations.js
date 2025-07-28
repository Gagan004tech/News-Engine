import React from "react";

function Recommendations({ articles }) {
  return (
    <div>
      <h2>Recommendations</h2>
      {articles.length === 0 && <p>No recommendations yet.</p>}
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <strong>{a.title}</strong> ({a.category})<br />
            <small>{a.published_at} | {a.source}</small><br />
            <a href={a.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations; 