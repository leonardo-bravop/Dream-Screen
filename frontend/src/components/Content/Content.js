import { useState, useEffect } from "react";
import axios from "axios";
import Row from "../Row/Row";
import { Routes, Route } from "react-router";
import Grid from "../Grid/Grid";
import Spinner from "../Spinner/Spinner";

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ color: "#02175a" }}>TRENDING TODAY</h2>
            </div>
            {loading && (
              <div style={{ marginTop: "60px" }}>
                <Spinner size={"3em"} color="#02175a" />
              </div>
            )}
            <Row media={popularMedia} />
            <Grid media={popularMedia.slice(0, 6)} />
            <div
              style={{
                backgroundColor: "#02175a",
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
          </div>
        }
      />
    </Routes>
  );
};

export default Content;
