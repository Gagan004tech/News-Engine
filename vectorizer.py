from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ArticleVectorizer:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.article_ids = []
        self.embeddings = None

    def fit(self, articles):
        self.article_ids = [a['id'] for a in articles]
        contents = [a['content'] for a in articles]
        if contents:
            self.embeddings = self.model.encode(contents)
        else:
            self.embeddings = None

    def get_user_profile_vector(self, liked_article_ids):
        if self.embeddings is None or not liked_article_ids:
            return None
        indices = [self.article_ids.index(aid) for aid in liked_article_ids if aid in self.article_ids]
        if not indices:
            return None
        user_vec = np.mean(self.embeddings[indices], axis=0, keepdims=True)
        return user_vec

    def recommend(self, user_vec, top_k=5, exclude_ids=None):
        if self.embeddings is None or user_vec is None:
            return []
        similarities = cosine_similarity(user_vec, self.embeddings).flatten()
        if exclude_ids:
            mask = [i for i, aid in enumerate(self.article_ids) if aid not in exclude_ids]
            similarities = similarities[mask]
            ids = [self.article_ids[i] for i in mask]
        else:
            ids = self.article_ids
        if len(similarities) == 0:
            return []
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        return [ids[i] for i in top_indices]

vectorizer_instance = ArticleVectorizer() 