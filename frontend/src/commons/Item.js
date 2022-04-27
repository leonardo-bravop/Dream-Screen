import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addToFavoriteMovies } from "../state/user";
import Spinner from "../components/Spinner";
import "./Item.css";

const Item = () => {
  const tmdbAPI = "https://api.themoviedb.org/3";
  const key = "46b1d60d45fa9282f81dabe7e845515e";
  const navigate = useNavigate();
  const { media, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    genres: "",
    runtime: "",
    tagline: "",
    overview: "",
    poster_path: "",
  });

  let mediaType;
  data.name ? (mediaType = "tv") : (mediaType = "movie");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFavoriteClick = (event) => {
    if (!user.id) alert("Please Login to save in favorites");
    else {
      dispatch(addToFavoriteMovies({ mediaType, mediaId: data.id })).then(
        (res) => setLoading(false)
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${tmdbAPI}/${media}/${id}?api_key=${key}&language=en-US`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        console.log(`algo salio mal`);
      });
  }, [id]);

  return (
    <div className="movieContent">
      {loading && (
        <div>
          <h3>Adding to favorites</h3>
          <Spinner />
        </div>
      )}
      <div id="itemPicture">
        {user.id && (user.favoriteMovies.includes(id) || user?.favoriteTv.includes(id)) ? (
          <button className="heartDivItem" o
          // onClick={onFavoriteClick}
          >
            <AiFillHeart />
          </button>
        ) : (
          <button className="heartDivItem" onClick={onFavoriteClick}>
            <AiOutlineHeart />
          </button>
        )}
        <img
          style={{
            width: "300px",
            height: "450px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
              : "/placeholder-image.png"
          }
        ></img>
      </div>

      <div className="header_poster_wrapper" style={{ margin: "20px" }}>
        <section className="itemDescription">
          <div className="title">
            <h2>{data.title || data.name}</h2>

            <div className="facts">
              <span className="genres" style={{ display: "flex" }}>
                {data.genres
                  ? data.genres.map((genre) => {
                      return (
                        <div key={genre.id} style={{ margin: "5px 8px" }}>
                          <Link to={`/${mediaType}/genre/${genre.name}`}>
                            {genre.name}
                          </Link>
                        </div>
                      );
                    })
                  : []}
              </span>
              {data.runtime ? (
                <span className="runtime"> {data.runtime} minutes</span>
              ) : null}
            </div>
          </div>
          <ul className="actions">User score: {data.vote_average}</ul>

          <div className="header_info">
            <h3 className="tagline">{data.tagline}</h3>

            <h3>Overview</h3>
            <div className="overview">
              <p>{data.overview}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Item;
