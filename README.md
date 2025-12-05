SentraMind – AI-Powered Mental Health Journal 🧠💚

SentraMind is a full-stack AI mental-health companion that helps users journal their thoughts, track emotions, and receive supportive AI-generated responses using Groq’s Llama-3 model.
Built with MERN Stack (MongoDB, Express, React, Node.js).

🚀 Features
📝 Smart Journaling

Users can write daily thoughts and feelings

Sentiments like Happy, Sad, Neutral, or custom emotions

🤖 AI-Powered Emotional Insights

Groq Llama-3 model analyzes user text

Generates supportive, empathetic responses

👤 User Authentication

Secure login/signup using JWT

Each user gets a private journal space

📅 Edit / Delete Entries

Update old journal entries

Remove posts you no longer want

📂 Organized Dashboard

Clean UI to view all entries

One-click “Read More” to open full details

🛠️ Tech Stack
Frontend:

React + Vite

Context API (Auth)

Axios

CSS + Modern UI Components

Backend:

Node.js

Express.js

MongoDB + Mongoose

Groq Llama-3 API

JWT Authentication

📦 Folder Structure
SentraMind/
│── Backend/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
│
│── Frontend/
│   ├── src/
│   └── vite.config.js
│
│── README.md

🔒 Environment Variables

Create a .env file inside Backend/:

MONGODB_URI=your_mongo_url
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
PORT=5000


(Note: .env is intentionally not included in the repo.)

▶️ How to Run the Project Locally
1️⃣ Backend Setup
cd Backend
npm install
npm start

2️⃣ Frontend Setup
cd Frontend
npm install
npm run dev


Project will run on:

Frontend → http://localhost:5173

Backend → http://localhost:5000 (or your PORT)

🤝 Contributions

Pull Requests are welcome!

📜 License

This project is open-source.

🙌 Author

Devansh Tripathi
GitHub: https://github.com/devansh-codes614
