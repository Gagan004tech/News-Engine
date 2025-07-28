import React, { useState, useEffect } from "react";
import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import Recommendations from "./components/Recommendations";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [articles, setArticles] = useState([]);
  const [liked, setLiked] = useState([]);
  const [userId] = useState("user1");
  const [recommendations, setRecommendations] = useState([]);

  // Fetch all articles from backend
  const fetchArticles = async () => {
    const res = await fetch(`${API_URL}/articles/`);
    const data = await res.json();
    setArticles(data);
  };

  // Get recommendations from backend
  const getRecommendations = async (likedIds) => {
    if (!likedIds || likedIds.length === 0) {
      setRecommendations([]);
      return;
    }
    const res = await fetch(`${API_URL}/recommend/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, top_k: 5 }),
    });
    const data = await res.json();
    setRecommendations(data.recommendations || []);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Add article to backend and refresh list
  const addArticle = async (article) => {
    await fetch(`${API_URL}/articles/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    fetchArticles();
  };

  // Like article in backend and local state, then update recommendations
  const likeArticle = async (articleId) => {
    await fetch(`${API_URL}/like/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, article_id: articleId }),
    });
    const newLiked = [...liked, articleId];
    setLiked(newLiked);
    getRecommendations(newLiked);
  };

  // Automatically get recommendations if user has liked articles
  useEffect(() => {
    if (liked.length > 0) {
      getRecommendations(liked);
    }
  }, [liked]);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>News Recommendation Engine</h1>
      <ArticleForm onAdd={addArticle} />
      <ArticleList articles={articles} liked={liked} onLike={likeArticle} />
      <Recommendations articles={recommendations} />
      <footer style={{
        marginTop: 40,
        textAlign: 'center',
        color: '#201c6b',
        opacity: 0.7,
        fontWeight: 500
      }}>
        Made by Gagandeep M
      </footer>
    </div>
  );
}

export default App;
