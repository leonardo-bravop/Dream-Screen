import { useState, useEffect } from "react";
import axios from "axios";
import Row from "./Row";
import { Routes, Route } from "react-router";

const Content = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const apiKey = "46b1d60d45fa9282f81dabe7e845515e";

  useEffect(() => {
    axios
      .get(`${tmdbAPI}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((res) => {
        setPopularMovies(res.data.results.slice(0, 7));
      });
  }, []);

  return (
    <Routes>
      <Route path="" element={<Row media={popularMovies} />} />
    </Routes>
  );
};

export default Content;
