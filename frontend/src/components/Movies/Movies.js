import { Route, Routes, useMatch, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import MediaRow from "../../commons/MediaRow/MediaRow";
import { Link } from "react-router-dom";
import "./Movies.css";

const Movies = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const statesArray = ["popular", "now_playing", "upcoming", "top_rated"];

  const matchState = useMatch("/media/movie/:state");

  const state = matchState?.params.state;

  const matchMovie = useMatch("/media/movie");

  useEffect(() => {
    setSelected(state);
    // if (
    //   state !== "popular" &&
    //   state !== "now_playing" &&
    //   state !== "upcoming" &&
    //   state !== "top_rated" &&
    //   matchMovie
    // ) {
    //   navigate("popular")
    // }
  }, [state]);

  // useEffect(() => {
  //   console.log("state es", state);

  //   console.log("render de nuevo");
  // }, [state]);

  return (
    <>
      <div className="movies-tagnav">
        {statesArray.map((state) => {
          return (
            <Link to={state} onClick={() => setSelected(state)}>
              <div className="tagnav-div">
                <button
                  className={`tagnav-button ${
                    selected === state ? "active-tagnav" : null
                  }`}
                >
                  {state[0].toUpperCase() +
                    state
                      .slice(1, state.length)
                      .split("_")
                      .join(" ")
                      .toUpperCase()}
                </button>
                {selected === state && (
                  <img src="/line.svg" className="tagnav-line" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <Routes>
        <Route
          path="popular"
          element={<MediaRow mediaType={"movie"} state={"popular"} />}
        ></Route>
        <Route
          path="now_playing"
          element={<MediaRow mediaType={"movie"} state={"now_playing"} />}
        ></Route>

        <Route
          path="upcoming"
          element={<MediaRow mediaType={"movie"} state={"upcoming"} />}
        ></Route>

        <Route
          path="top_rated"
          element={<MediaRow mediaType={"movie"} state={"top_rated"} />}
        ></Route>
      </Routes>{" "}
    </>
  );
};

export default Movies;
