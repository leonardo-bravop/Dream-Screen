import "./Profile.css";
import ProfileCard from "../../commons/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const Profile = ({ edit }) => {
  const { nickName } = useParams();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(false);
    if (nickName) {
      axios.get(`/api/users/${nickName}`).then((res) => {
        console.log(`res es`, res);
        setUserData(res.data);
        if (res.data.favoriteMovies) {
          let favMovies = res.data.favoriteMovies.split(" ");
          favMovies.pop();
          if (favMovies.length > 18) {
            favMovies = favMovies.slice(0, 18);
          }
          setFavoriteMovies(favMovies);
        }
        if (res.data.favoriteTv) {
          let favTv = res.data.favoriteTv.split(" ");
          favTv.pop();
          if (favTv.length > 18) {
            favTv = favTv.slice(0, 17);
          }
          setFavoriteTv(favTv);
        }
        setLoading(false);
      });
      setLoading(true);
    }
  }, []);

  return (
    <div className="user-content">
      <div className="user-banner-div">
        <span className="user-nickname">{userData.nickName}</span>
      </div>

      <div className="favoriteMedia">
        <h2>Favorite movies</h2>
        {loading && <Spinner />}
        <div className="cards-div">
          {favoriteMovies.length
            ? favoriteMovies.map((movieId) => {
                return <ProfileCard mediaId={movieId} mediaType={"movie"} />;
              })
            : !loading
            ? `${userData.nickName} doesn't have any favorite movie yet`
            : null}
        </div>
        <h2>Favorite Tv Shows</h2>
        {loading && <Spinner />}
        <div className="cards-div">
          {favoriteTv.length
            ? favoriteTv.map((tvId) => {
                return <ProfileCard mediaId={tvId} mediaType={"tv"} />;
              })
            : !loading
            ? `${userData.nickName} doesn't have any favorite Tv Show yet`
            : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
