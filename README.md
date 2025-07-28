# News Recommendation Engine

A modern, AI-powered news recommendation system with a FastAPI backend and a stylish React frontend.

---

## Features
- Add, like, and recommend news articles
- AI-powered recommendations using Sentence Transformers
- Modern, responsive React UI with custom color palette
- User feedback and validation

---

## Project Structure

- `main.py` — FastAPI backend
- `vectorizer.py` — AI model logic
- `requirements.txt` — Backend dependencies
- `news-recommendation-ui/` — React frontend

---

## Setup Instructions

### Backend (FastAPI)
1. **Install dependencies:**
   ```bash
   python -m pip install -r requirements.txt
   python -m pip install sentence-transformers
   ```
2. **Run the backend:**
   ```bash
   uvicorn main:app --reload
   ```
3. **API docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend (React)
1. **Install dependencies:**
   ```bash
   cd news-recommendation-ui
   npm install
   ```
2. **Run the frontend:**
   ```bash
   npm start
   ```
3. **Open in browser:** [http://localhost:3000](http://localhost:3000)

---

## Usage
- Add articles via the UI or `/articles/` endpoint
- Like articles to personalize recommendations
- Recommendations update automatically as you interact

---

## Credits
**Made by Gagandeep M** 