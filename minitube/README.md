# MiniTube 🎬

A full-stack YouTube-inspired video platform built with the MERN stack.

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcryptjs, Cloudinary, Multer  
**Frontend:** React 18, Vite, Tailwind CSS, Axios, React Router v6

---

## Features

- 🔐 JWT Auth with access + refresh token system
- 📹 Video upload, streaming, views counter
- 👍 Like/dislike videos and comments
- 💬 Comments with edit/delete
- 🔔 Subscribe/unsubscribe to channels
- 📋 Playlists (create, add/remove videos)
- 🐦 Tweets (community posts)
- 📊 Channel dashboard with stats
- 🔍 Search videos
- 📜 Watch history
- ⚙️ Profile and settings management
- ☁️ Cloudinary for media storage

---

## Project Structure

```
minitube/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   └── video/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   └── utils/
    ├── .env.example
    └── package.json
```

---

## Setup Instructions

### 1. Clone and install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

**Backend** — copy `.env.example` to `.env` and fill in:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/minitube
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** — copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Run the app

```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

Frontend runs on **http://localhost:5173**  
Backend runs on **http://localhost:8000**

---

## API Endpoints

| Resource | Endpoint |
|----------|----------|
| Auth | `/api/v1/users` |
| Videos | `/api/v1/videos` |
| Comments | `/api/v1/comments` |
| Likes | `/api/v1/likes` |
| Subscriptions | `/api/v1/subscriptions` |
| Playlists | `/api/v1/playlists` |
| Tweets | `/api/v1/tweets` |
| Dashboard | `/api/v1/dashboard` |

---

## Deployment

- **Backend:** Render / Railway
- **Frontend:** Netlify / Vercel
- **Database:** MongoDB Atlas
- **Media:** Cloudinary

---

Built by Sanjeet 🚀
