import { useState } from "react";
import MediaRow from "../MediaRow";
import { Link } from "react-router-dom";
import "./Movies.css";

const Movies = () => {
  const [selected, setSelected] = useState("popular");
  const statesArray = ["popular", "now_playing", "upcoming", "top_rated"];
  return (
    <>
      <div className="movies-tagnav">
        {statesArray.map((state) => {
          return (
            <Link to={state} onClick={() => setSelected(state)}>
              <div className="tagnav-div">
                <button className="tagnav-button">
                  {state[0].toUpperCase() +
                    state.slice(1, state.length).split("_").join(" ")}
                </button>
                {selected === state && (
                  <img src="/line.svg" className="tagnav-line" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <MediaRow mediaType={"movie"} state={selected} />
    </>
  );
};

export default Movies;
