import "./Profile.css";
import { useSelector } from "react-redux";
import ProfileCard from "../../commons/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = ({edit}) => {
  const user = useSelector((state) => state.user);
  const { nickName } = useParams();
  console.log(`id es`, nickName);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if(nickName) {
      axios.get(`/api/users/${nickName}`).then((res) => {
        console.log(`res es`, res);
        setUserData(res.data);
        if (res.data.favoriteMovies) {
          let favMovies = res.data.favoriteMovies.split(" ");
          favMovies.pop();
          console.log(`fav movies es`, favMovies);
          setFavoriteMovies(favMovies);
        }
        if (res.data.favoriteTv) {
          let favTv = res.data.favoriteTv.split(" ");
          favTv.pop();
          setFavoriteTv(favTv);
        }
  
        // setLoading(false);
      });
    }
    else {
      console.log(`LOL`);
      if (user.favoriteMovies) {
        let favMovies = user.favoriteMovies.split(" ");
        favMovies.pop();
        console.log(`fav movies es`, favMovies);
        setFavoriteMovies(favMovies);
      }
      if (user.favoriteTv) {
        let favTv = user.favoriteTv.split(" ");
        favTv.pop();
        setFavoriteTv(favTv);
      }
      setUserData(user)
    }
  }, []);

  return (
    <div className="user-content">
      <div className="user-banner-div">
        <span className="user-nickname">
          {userData.nickName}
        </span>
      </div>

      <div className="favoriteMedia">
        {edit? <Link to="/user/my-favorites/movies"><button>Edit</button></Link>:null}
        <h2>Favorite movies</h2>
        <div className="cards-div">
          {favoriteMovies.length? favoriteMovies.map((movieId) => {
            return <ProfileCard mediaId={movieId} mediaType={"movie"} />;
          }) : `${userData.nickName} hasn't any favorite movie yet`}
        </div>
        <h2>Favorite Tv Shows</h2>
        <div className="cards-div">
          {favoriteTv.length? favoriteTv.map((tvId) => {
            return <ProfileCard mediaId={tvId} mediaType={"tv"} />;
          }): `${userData.nickName} hasn't any favorite Tv Show yet`}
        </div>
      </div>
    </div>
  );
};

export default Profile;
