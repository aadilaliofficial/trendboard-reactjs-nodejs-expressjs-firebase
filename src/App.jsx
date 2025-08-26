import { useEffect, useState } from "react";
import { fetchAndSaveNews, getNewsFromFirestore } from "./services/newsService";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchAndSaveNews();
      const data = await getNewsFromFirestore();
      setArticles(data);
    };
    loadData();
  }, []);

  // 🔍 Filter + Search
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || article.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950 text-white p-6 space-y-6">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <img
          src="https://png.pngtree.com/element_our/sm/20180516/sm_5afc4cd0dcaca.jpg"
          alt="logo"
          className="w-10 h-10 rounded-lg"
        />
        <h1 className="text-3xl font-bold">TrendBoard</h1>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <Input
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-zinc-900 text-white border-zinc-700"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
        >
          <option>All</option>
          <option>World</option>
          <option>Business</option>
          <option>Technology</option>
        </select>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArticles.map((article, index) => (
          <Card
            key={article.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="shadow-lg rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-black to-black border border-purple-700 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-700/50"
          >
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-purple-300 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-400 mt-2 line-clamp-3">{article.summary}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline mt-3 block"
              >
                Read More →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
