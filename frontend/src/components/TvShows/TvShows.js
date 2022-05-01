import { Route, Routes, useMatch, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import MediaRow from "../MediaRow";
import { Link } from "react-router-dom";
import "../Movies/Movies.css";

const TvShows = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const statesArray = ["popular", "top_rated"];
  const matchState = useMatch("/media/tv/:state");

  const state = matchState?.params.state;

  useEffect(() => {
    setSelected(state);
    //   if (state !== "popular" && state !== "top_rated") {
    //     navigate("popular");
    //   }
  }, [state]);

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
                {/* {selected === state && (
                  <img src="/line.svg" className="tagnav-line" />
                )} */}
              </div>
            </Link>
          );
        })}
      </div>
      <Routes>
        <Route
          path="popular"
          element={<MediaRow mediaType={"tv"} state={"popular"} />}
        ></Route>
        <Route
          path="top_rated"
          element={<MediaRow mediaType={"tv"} state={"top_rated"} />}
        ></Route>
      </Routes>{" "}
    </>
  );
};

export default TvShows;
