import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BsTrash } from "react-icons/bs";
import { RemoveFromFavorites } from "../state/user";
import "./FavoritesCard.css"

const FavoritesCard = ({ movieId, mediaType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tmdbAPI = "https://api.themoviedb.org/3";
  const key = "46b1d60d45fa9282f81dabe7e845515e";
  const [data, setData] = useState({
    title: "",
    genres: "",
    runtime: "",
    tagline: "",
    overview: "",
    poster_path: "",
  });

  const onRemoveClick = (event) => {
    dispatch(RemoveFromFavorites({ mediaType, mediaId: movieId })).then(
      (res) => res
    );
  };

  useEffect(() => {
    axios
      .get(`${tmdbAPI}/${mediaType}/${movieId}?api_key=${key}&language=en-US`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/404");
      });
  }, [movieId]);

  return (
    <div className="favoritesCard">
      <button className="trashDiv" onClick={onRemoveClick}>
        <BsTrash />
      </button>
      <Link to={`/media/${mediaType}/id/${data.id}`}>
        <div className="card-image">
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
        </div>
      </Link>
    </div>
  );
};

export default FavoritesCard;
