import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import "../FavoritesCard/FavoritesCard.css";
import Spinner from "../../components/Spinner/Spinner";

const ProfileCard = ({ mediaId, mediaType }) => {
  const [data, setData] = useState({
    title: "",
    genres: "",
    runtime: "",
    tagline: "",
    overview: "",
    poster_path: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    axios
      .get(`/api/media/${mediaType}/id/${mediaId}/language/en-US`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(true);
  }, [mediaId]);

  return (
    <div className="favoritesCard">
      {/* {loading && <Spinner size={"2em"} />} */}
      {!loading && (
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
          <div className="favcard-content">
            <p>{data.title || data.name}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileCard;
