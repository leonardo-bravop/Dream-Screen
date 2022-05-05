import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addToFavoriteMovies, RemoveFromFavorites } from "../../state/user";
import Spinner from "../../components/Spinner/Spinner";
import "./Item.css";

const Item = () => {
  const navigate = useNavigate();
  const { media, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
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
      dispatch(RemoveFromFavorites({ mediaType, mediaId: data.id })).then(
        (res) => setLoading(false)
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    setLoadingContent(false);
    axios
      .get(`/api/media/${media}/id/${id}/language/en-US`)
      .then((res) => {
        setData(res.data);
        setLoadingContent(false);
      })
      .catch(() => {
        console.log(`Data failed to load`);
      });
    setLoadingContent(true);
  }, [id]);

  return (
    <>
      {loadingContent && (
        <div style={{ marginTop: "60px" }}>
          <Spinner size={"3em"} />
        </div>
      )}
      {!loadingContent && (
        <div
          className="movieContent"
          style={{
            backgroundImage: ` linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.7) 100%), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path})`,
            backgroundPosition: "center",
          }}
        >
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
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>
                    {data.title || data.name}
                    {data.release_date
                      ? ` (${data.release_date.slice(0, 4)})`
                      : data.first_air_date
                      ? ` (${data.first_air_date.slice(0, 4)})`
                      : null}
                  </h2>
                </span>

                <div className="facts">
                  <div className="genres" style={{ display: "flex" }}>
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
                  </div>
                  {data.runtime ? (
                    <div className="runtime"> {data.runtime} minutes</div>
                  ) : data.episode_run_time ? (
                    <div className="runtime">
                      {data.episode_run_time[0]} minutes
                    </div>
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
                    margin: "10px 10px 10px 0",
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
                  <Spinner size={"2em"} />
                </div>
              ) : user.id &&
                (user.favoriteMovies.includes(id) ||
                  user?.favoriteTv.includes(id)) ? (
                <button
                  className="heartDivItem filledHeart"
                  onClick={onRemoveFavClick}
                >
                  <AiFillHeart />
                </button>
              ) : (
                <button className="heartDivItem" onClick={onFavoriteClick}>
                  <AiOutlineHeart />
                </button>
              )}
              <div className="header_info">
                <h3 className="tagline">{data.tagline}</h3>

                <h3>Overview</h3>
                <div className="overview">
                  <p>{data.overview || "There is no overview for this item"}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
