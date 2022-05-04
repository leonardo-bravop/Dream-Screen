import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BsTrash } from "react-icons/bs";
import { RemoveFromFavorites } from "../../state/user";
import "./FavoritesCard.css";
import Spinner from "../../components/Spinner/Spinner";

const FavoritesCard = ({ mediaId, mediaType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    genres: "",
    runtime: "",
    tagline: "",
    overview: "",
    poster_path: "",
  });
  const [loadingContent, setLoadingContent] = useState(false);

  const onRemoveClick = (event) => {
    dispatch(RemoveFromFavorites({ mediaType, mediaId })).then((res) =>
      setLoading(false)
    );
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    setLoadingContent(false);
    axios
      .get(`/api/media/${mediaType}/id/${mediaId}/language/en-US`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        setLoadingContent(false);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/404");
      });
    setLoadingContent(true);
  }, [mediaId]);

  return (
    <div className="favoritesCard">
      {!loadingContent ? (
        <>
          {!loading ? (
            <button className="trashDiv" onClick={onRemoveClick}>
              <BsTrash />
            </button>
          ) : (
            <div className="trashDiv trashSpinner">
              <Spinner size={"2em"} />
            </div>
          )}
          <Link to={`/media/${mediaType}/id/${data.id}`}>
            <figure>
              <img
                className="image"
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w200/${data.poster_path}`
                    : `/placeholder-image.png`
                }
                alt="Placeholder image"
              />
            </figure>
            <div className="favcard-content">
              <p>{data.title || data.name}</p>
            </div>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default FavoritesCard;
