import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import "../FavoritesCard/FavoritesCard.css"

const ProfileCard = ({ mediaId, mediaType }) => {

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

  useEffect(() => {
    axios
      .get(`${tmdbAPI}/${mediaType}/${mediaId}?api_key=${key}&language=en-US`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/404");
      });
  }, [mediaId]);

  return (
    <div className="favoritesCard">
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

export default ProfileCard;
