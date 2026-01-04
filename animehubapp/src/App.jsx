import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import AnimeDetail from "./pages/AnimeDetail";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then(res => res.json())
      .then(data => setAnimeList(data.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(anime) {
    if (watchlist.some(item => item.mal_id === anime.mal_id)) {
      setWatchlist(watchlist.filter(item => item.mal_id !== anime.mal_id));
    } else {
      setWatchlist([...watchlist, anime]);
    }
  }

  return (
    <div>
      <nav style={{ textAlign: "center", marginBottom: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/watchlist">My Watchlist ⭐</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              animeList={animeList}
              search={search}
              setSearch={setSearch}
              watchlist={watchlist}
              addToWatchlist={addToWatchlist}
            />
          }
        />

        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              addToWatchlist={addToWatchlist}
            />
          }
        />

        <Route
          path="/anime/:id"
          element={<AnimeDetail animeList={animeList} />}
        />
      </Routes>
    </div>
  );
}

export default App;