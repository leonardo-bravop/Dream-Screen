import Card from "./Card";
import { useMatch, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const SearchListGrid = () => {
  const navigate = useNavigate();
  const [anotherMedia, setAnotherMedia] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const key = "46b1d60d45fa9282f81dabe7e845515e";
  const matchGeneral = useMatch("/");

  const [loading, setLoading] = useState(false);

  let { mediaType, searchValue } = useParams();

  if (matchGeneral) {
    mediaType = "multi";
  }

  useEffect(() => {
    setAnotherMedia([]);
    axios
      .get(
        `${tmdbAPI}/search/${mediaType}?api_key=${key}&language=en-US&query=${searchValue}`
      )
      .then((res) => res.data)
      .then((data) => {
        setAnotherMedia(data.results);
        setLoading(false);
      })
      .catch(() => {
        navigate("/404");
      });
    setLoading(true);
  }, [searchValue]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px 10%"
      }}
    >
      {loading && <div style={{position: "absolute", marginTop: "20px"}}><Spinner /></div>}
      {anotherMedia.map((media) => (
        <div className="cardLinkDiv" key={media.id}>
          <Card data={media} title={media.title || media.name} />
        </div>
      ))}
    </div>
  );
};

export default SearchListGrid;
