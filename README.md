# VSB Engineering College - AI Chatbot (MVP)

A working starter version of the AI chatbot described in the project brief:
React (Vite) frontend + Node/Express backend + Google Gemini 2.5 Flash API,
answering only from a college knowledge base file so it never invents facts.

## What's included (MVP scope)
- AI chat assistant (English / Tamil / Tanglish, auto-detected)
- Home page with quick action cards
- Admissions, Departments, Placements, Fees, Scholarships, Facilities, Contact pages
- Single JSON knowledge base (`backend/data/collegeData.json`) — edit this with your real college data

## Not included yet (add later if you have time)
MongoDB database, login/auth, admin dashboard, voice input/output, analytics,
chat history persistence. The doc's full spec is a multi-week team project;
this MVP is built so you can bolt those on top later without a rewrite.

---

## STEP-BY-STEP: How to run this

### 0. Install prerequisites (one time)
- Install **Node.js** (v18 or newer): https://nodejs.org (download the LTS version, click through the installer)
- Check it worked by opening a terminal and running:
  ```
  node -v
  npm -v
  ```

### 1. Get a free Gemini API key
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with a Google account and click "Create API key"
3. Copy the key somewhere safe

### 2. Set up the backend
```
cd backend
npm install
cp .env.example .env
```
Open the new `.env` file and paste your key:
```
PORT=5000
GEMINI_API_KEY=paste_your_key_here
```
Start the backend:
```
npm run dev
```
You should see: `VSB Chatbot backend running on http://localhost:5000`
Leave this terminal running.

### 3. Set up the frontend (open a NEW terminal)
```
cd frontend
npm install
cp .env.example .env
```
The default `.env` already points to `http://localhost:5000`, so you can leave it as-is.
Start the frontend:
```
npm run dev
```
It will print a local URL, usually `http://localhost:5173`. Open that in your browser.

### 4. Try it out
- Chat with the assistant on the home page, or click a Quick Action card
- Browse the Admissions / Departments / Placements / Fees / Scholarships / Facilities / Contact pages

### 5. Put in your real college data
Edit `backend/data/collegeData.json` — replace the placeholder text (fees, contact
details, placement stats, department info) with your actual official figures.
The chatbot and all pages read from this one file, so you only edit it once.
Restart the backend (`Ctrl+C`, then `npm run dev` again) after editing it.

---

## Project structure
```
vsb-chatbot/
├── backend/
│   ├── server.js            # Express server, /api/chat and /api/info
│   ├── data/collegeData.json  # <-- your knowledge base, edit this
│   └── .env                 # your Gemini API key (create from .env.example)
└── frontend/
    ├── src/
    │   ├── pages/            # one file per module/page
    │   ├── components/       # Navbar, ChatWindow, QuickActions, etc.
    │   └── hooks/useCollegeData.js
    └── .env                  # points to backend URL
```

## Troubleshooting
- **Chat says "trouble reaching the server"** → make sure the backend terminal is
  still running and shows no errors, and that `GEMINI_API_KEY` is set in `backend/.env`.
- **"AI service error" in chat** → your Gemini API key may be invalid, expired, or
  you've hit a free-tier rate limit. Check the backend terminal logs for details.
- **Port already in use** → change `PORT` in `backend/.env` and
  `VITE_API_BASE_URL` in `frontend/.env` to match.

## Suggested next steps (once this is running and demoed)
1. Swap the JSON file for MongoDB Atlas once you're comfortable with the basics.
2. Add JWT login for a student/admin distinction.
3. Add an admin page that edits `collegeData.json` (or the DB) through a form
   instead of hand-editing JSON.
4. Add chat history persistence per user.
5. Add Web Speech API for voice input/output (browser-native, no extra backend needed).
