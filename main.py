from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from vectorizer import vectorizer_instance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
articles_db: Dict[int, dict] = {}
user_profiles: Dict[str, List[int]] = {}  # user_id -> list of liked article ids

class Article(BaseModel):
    id: int
    title: str
    content: str
    url: str
    published_at: str
    source: str
    category: str = "general"

class LikeRequest(BaseModel):
    user_id: str
    article_id: int

class RecommendRequest(BaseModel):
    user_id: str
    top_k: int = 5

@app.post("/articles/")
def add_article(article: Article):
    if article.id in articles_db:
        raise HTTPException(status_code=400, detail="Article already exists.")
    articles_db[article.id] = article.dict()
    # Refit vectorizer on all articles
    vectorizer_instance.fit(list(articles_db.values()))
    return {"message": "Article added."}

@app.post("/like/")
def like_article(like: LikeRequest):
    if like.article_id not in articles_db:
        raise HTTPException(status_code=404, detail="Article not found.")
    user_profiles.setdefault(like.user_id, []).append(like.article_id)
    return {"message": "Article liked."}

@app.post("/recommend/")
def recommend(request: RecommendRequest):
    liked_ids = user_profiles.get(request.user_id, [])
    user_vec = vectorizer_instance.get_user_profile_vector(liked_ids)
    rec_ids = vectorizer_instance.recommend(user_vec, top_k=request.top_k, exclude_ids=liked_ids)
    rec_articles = [articles_db[aid] for aid in rec_ids]
    return {"recommendations": rec_articles}

@app.get("/articles/")
def get_articles():
    return list(articles_db.values()) 