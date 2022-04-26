import { useState, useEffect } from "react";
import axios from "axios";
import Row from "./Row";
import { Routes, Route } from "react-router";
import Grid from "./Grid";

const Content = () => {
  const [popularMedia, setPopularMedia] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const apiKey = "46b1d60d45fa9282f81dabe7e845515e";

  useEffect(() => {
    axios
      .get(
        `${tmdbAPI}/trending/all/day?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setPopularMedia(res.data.results);
      });
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <Row media={popularMedia} />
            <Grid media={popularMedia} />
          </>
        }
      />
    </Routes>
  );
};

export default Content;
