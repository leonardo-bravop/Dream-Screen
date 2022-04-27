import { useState } from "react";
import MediaRow from "../MediaRow";
import { Link } from "react-router-dom";
import "./Movies.css";

const Movies = () => {
  const [selected, setSelected] = useState("popular");
  return (
    <>
      <div className="movies-tagnav">
        <Link to="popular">
          <div className="tagnav-div">
            <button
              className="tagnav-button"
              onClick={() => setSelected("popular")}
            >
              Popular
            </button>
            {selected === "popular" && (
              <img src="/line.svg" className="tagnav-line" />
            )}
          </div>
        </Link>
        <Link to="now-playing">
          <div className="tagnav-div">
            <button
              className="tagnav-button"
              onClick={() => setSelected("now_playing")}
            >
              Now playing
            </button>
            {selected === "now_playing" && (
              <img src="/line.svg" className="tagnav-line" />
            )}{" "}
          </div>
        </Link>
        <Link to="upcoming">
          <div className="tagnav-div">
            <button
              className="tagnav-button"
              onClick={() => setSelected("upcoming")}
            >
              Upcoming
            </button>
            {selected === "upcoming" && (
              <img src="/line.svg" className="tagnav-line" />
            )}{" "}
          </div>
        </Link>
        <Link to="top-rated">
          <div className="tagnav-div">
            <button
              className="tagnav-button"
              onClick={() => setSelected("top_rated")}
            >
              Top rated
            </button>
            {selected === "top_rated" && (
              <img src="/line.svg" className="tagnav-line" />
            )}{" "}
          </div>
        </Link>
      </div>
      <MediaRow mediaType={"movie"} state={selected} />
    </>
  );
};

export default Movies;
