import Card from "./Card";
import { useMatch, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchListGrid = () => {
  const navigate = useNavigate();
  const [anotherMedia, setAnotherMedia] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const key = "46b1d60d45fa9282f81dabe7e845515e";
  const matchGeneral = useMatch("/");
  let { mediaType, searchValue } = useParams();

  if(matchGeneral) {
    mediaType = "multi"
  }

  useEffect(() => {
    axios
      .get(
        `${tmdbAPI}/search/${mediaType}?api_key=${key}&language=en-US&query=${searchValue}`
      )
      .then((res) => res.data)
      .then((data) => setAnotherMedia(data.results))
      .catch(() => {
        navigate("/404");
      });
  }, [searchValue]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: `60%`,
      }}
    >
      {anotherMedia.map((movie) => (
        <div className="cardLinkDiv" key={movie.id}>
          <Card data={movie} />
        </div>
      ))}
    </div>
  );
};

export default SearchListGrid;
