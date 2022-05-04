import Card from "../commons/Card/Card";
import { useMatch, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";

const SearchListGrid = () => {
  const navigate = useNavigate();
  const [anotherMedia, setAnotherMedia] = useState([]);
  const [noResults, setNoResults] = useState("");
  const matchGeneral = useMatch("/");

  const [loading, setLoading] = useState(false);

  let { mediaType, searchValue } = useParams();

  if (matchGeneral) {
    mediaType = "multi";
  }

  useEffect(() => {
    setAnotherMedia([]);
    setNoResults("");
    axios
      .get(
        `/api/media/${mediaType}/search/${searchValue}/en-US/1`
      )
      .then((res) => res.data)
      .then((data) => {
        setAnotherMedia(data.results);
        setLoading(false);
        setNoResults("No se encontraron resultados");
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
        margin: "20px 10%",
      }}
    >
      {loading && (
        <div style={{ position: "absolute", marginTop: "20px" }}>
          <Spinner size={"3em"}/>
        </div>
      )}
      {anotherMedia.length
        ? anotherMedia.map((media) => (
            <div className="cardLinkDiv" key={media.id}>
              <Card data={media} title={media.title || media.name} />
            </div>
          ))
        : noResults}
    </div>
  );
};

export default SearchListGrid;
