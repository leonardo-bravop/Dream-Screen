import { useState, useEffect } from "react";
import axios from "axios";
import Row from "./Row";
import { Routes, Route } from "react-router";
import Grid from "./Grid";

const Content = () => {
  const [popularMedia, setPopularMedia] = useState([]);
  const [moviesPLaying, setMoviesPlaying] = useState([]);
  const [comingMovies, setComingMovies] = useState([]);
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

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${tmdbAPI}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  //     )
  //     .then((res) => {
  //       setMoviesPlaying(res.data.results);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${tmdbAPI}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
  //     .then((res) => {
  //       setComingMovies(res.data.results);
  //     });
  // }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <div>
              <h2>Trending today:</h2>
            </div>
            <Row media={popularMedia} />
            {/* <Grid media={popularMedia.slice(0, 6)} /> */}
            {/* <div>
              <h2>Now playing:</h2>
            </div> */}
            {/* <Row media={moviesPLaying} /> */}
            {/* <Grid media={moviesPLaying.slice(0, 6)} /> */}
            {/* <div>
              <h2>Coming soon:</h2>
            </div> */}
            {/* <Row media={comingMovies} /> */}
            {/* <Grid media={comingMovies.slice(0, 6)} /> */}
            <div
              style={{
                backgroundColor: "#1e1eac",
                width: "100%",
                margin: "40px 0",
                padding: "20px 0",
                color: "white",
                textAlign: "center",
              }}
            >
              <h2>Join Dream Screen!</h2>
              <p>Create a profile and save favorite movies and tv shows</p>
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default Content;
