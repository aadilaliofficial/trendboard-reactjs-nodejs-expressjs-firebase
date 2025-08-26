// src/services/newsService.js
import axios from "axios";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const summarizeText = async (text) => {
  try {
    const res = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return data.summary || text.slice(0, 200) + "...";
  } catch (error) {
    console.error("Summarization error:", error);
    return text.slice(0, 200) + "...";
  }
};

// 🔹 All category feeds
const feeds = {
  World: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  Business: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  Technology: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  Sports: "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
};

export const fetchAndSaveNews = async () => {
  for (let [category, feedUrl] of Object.entries(feeds)) {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;
    const res = await axios.get(url);
    const items = res.data.items;

    for (let item of items) {
      // Duplicate check
      const q = query(
        collection(db, "articles"),
        where("title", "==", item.title)
      );
      const existing = await getDocs(q);
      if (!existing.empty) continue;

      const summary = await summarizeText(item.content);

      await addDoc(collection(db, "articles"), {
        title: item.title,
        link: item.link,
        category, // ✅ feed se assigned category
        summary,
        pubDate: item.pubDate,
      });
    }
  }
};

export const getNewsFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "articles"));
  let data = [];
  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data;
};
