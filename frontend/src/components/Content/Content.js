import { useState, useEffect } from "react";
import axios from "axios";
import Row from "../Row/Row";
import { Routes, Route } from "react-router";
import Grid from "../Grid/Grid";
import Spinner from "../Spinner/Spinner";
import "./Content.css"

const Content = () => {
  const [popularMedia, setPopularMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    axios.get(`/api/media/getTrending/en-US/1`).then((res) => {
      setLoading(false);
      setPopularMedia(res.data.results);
    });
    setLoading(true);
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="content-container">
            <div
              className="extraInfo"
            >
              <h1 style={{fontSize: "3em"}}>Explore Movies and TV Shows</h1>
              {/* <p style={{ fontSize: "1.1em" }}>
                Create a profile and save favorite movies and TV shows
              </p> */}
              {/* <h2>Join Dream Screen!</h2>
              <p style={{ fontSize: "1.1em" }}>
                Create a profile and save favorite movies and TV shows
              </p> */}
            </div>
            <div>
              <h1 style={{ color: "#02175a", letterSpacing: "0.05em" }}>TRENDING NOW</h1>
            </div>
            {loading && (
              <div style={{ marginTop: "60px" }}>
                <Spinner size={"3em"} color="#02175a" />
              </div>
            )}
            <Row media={popularMedia} />
            <Grid media={popularMedia.slice(0, 6)} />
          </div>
        }
      />
    </Routes>
  );
};

export default Content;
