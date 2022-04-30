import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addToFavoriteMovies, RemoveFromFavorites } from "../state/user";
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

  const onRemoveFavClick = (event) => {
    if (!user.id) alert("Can't remove from favorites");
    else {
      dispatch(RemoveFromFavorites({ mediaType, mediaId: data.id  })).then(
        (res) => setLoading(false)
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${tmdbAPI}/${media}/${id}?api_key=${key}&language=en-US`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(() => {
        console.log(`algo salio mal`);
      });
  }, [id]);

  return (
    <>
      {/* <div className="content-div"> */}
      <div className="movieContent">
        <div className="banner-div">
          {data.backdrop_path ? (
            <img
              src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path}`}
              className="banner-img"
            />
          ) : (
            <div
              className="banner-img"
              style={{ backgroundColor: "rgba(246, 246, 246, 0.9)" }}
            ></div>
          )}
        </div>

        <div id="itemPicture">
          <img
            className="movie-pic"
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                : "/placeholder-image.png"
            }
          ></img>
        </div>

        <div className="media-wrapper">
          <section className="itemDescription">
            <div className="title">
              <h2>{data.title || data.name}</h2>

              <div className="facts">
                <span className="genres" style={{ display: "flex" }}>
                  {data.genres
                    ? data.genres.map((genre) => {
                        return (
                          <div key={genre.id} className="genre-div">
                            {/* <Link to={`/${mediaType}/genre/${genre.name}`}> */}
                            {genre.name}
                            {/* </Link> */}
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
            <div className="score-div">
              <div
                style={{
                  border: `4px solid ${
                    data.vote_count
                      ? `hsl(${14 * parseInt(data.vote_average)},100%,50%)`
                      : `gray`
                  }`,
                  width: "60px",
                  margin: "10px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
              >
                <div>{data.vote_count ? data.vote_average : "NS"}</div>
              </div>
            </div>
            {loading ? (
              <div className="heartDivItem">
                <Spinner />
              </div>
            ) : user.id &&
              (user.favoriteMovies.includes(id) ||
                user?.favoriteTv.includes(id)) ? (
              <button
                className="heartDivItem filledHeart"
                o
                onClick={onRemoveFavClick}
              >
                <AiFillHeart />
              </button>
            ) : (
              <button className="heartDivItem" onClick={onFavoriteClick}>
                <AiOutlineHeart />
              </button>
            )}
            {/* <ul className="actions">User score: {data.vote_average}</ul> */}

            <div className="header_info">
              <h3 className="tagline">{data.tagline}</h3>

              <h3>Overview</h3>
              <div className="overview">
                <p>{data.overview || "There is no overview for this item"}</p>
              </div>
            </div>
          </section>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Item;
