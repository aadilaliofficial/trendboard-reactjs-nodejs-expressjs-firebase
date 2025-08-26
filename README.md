# 🌟 Trendboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://trendboard-newsroom.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A sleek and interactive dashboard for trending articles. Fetches RSS/API data, summarizes content using AI, and displays it in a beautiful, filterable news feed. Includes charts for topic frequency for extra insights.

---

## 🔥 Features

- Fetch trending articles from RSS/API sources (e.g., New York Times RSS)
- Summarize articles using OpenAI API
- Store and manage data in Firebase Firestore
- Interactive cards with filters and search
- Visual charts for trending topic frequency
- Fully responsive UI

---

## 🛠 Tech Stack

- **Frontend:** React.js, ShadCN UI  
- **Backend:** Node.js, Express.js, CORS  
- **Database:** Firebase Firestore  
- **Hosting:** Vercel (Frontend), Render (Backend)  
- **APIs:** OpenAI API, New York Times RSS API  

---

## 🚀 Demo

Check out the live app: [Trendboard Live](https://trendboard-newsroom.vercel.app/)

![Trendboard Screenshot](https://user-images.githubusercontent.com/yourusername/placeholder-screenshot.png)  
*Your Trendboard dashboard in action.*

---

## 💻 Installation

1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   cd trendboard

Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install


Set up environment variables
Create a .env file in the backend folder:

OPENAI_API_KEY=your_openai_api_key
NYT_API_KEY=your_nyt_api_key
FIREBASE_CONFIG=your_firebase_config


Run locally

# Backend
cd server
npm start

# Frontend
cd ../client
npm start

⚡ Usage

Browse trending articles

Filter by category and search for topics

View AI-generated summaries

Explore charts showing trending topics

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

📜 License

This project is licensed under the MIT License - see the LICENSE
 file for details.
 
