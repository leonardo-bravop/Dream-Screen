import { useState } from "react";
import { Link } from "react-router-dom";
import MediaRow from "../MediaRow";

const TvShows = () =>{
  const [selected, setSelected] = useState("popular");
  const statesArray = ["popular", "top_rated"];

    return (
       <>
        <div className="movies-tagnav">
        {statesArray.map((state) => {
          return (
            <Link to={state}>
              <div className="tagnav-div">
                <button
                  className="tagnav-button"
                  onClick={() => setSelected(state)}
                >
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
        <MediaRow mediaType={"tv"} state={selected}/></>
    )
}

export default TvShows;
