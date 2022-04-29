import "./Profile.css";
import { useSelector } from "react-redux";
import FavoritesCard from "../../commons/FavoritesCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  console.log(`id es`, id);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);
  // let favoriteMovies = "639933 634649 414906 634 534 300 1498 ".split(" ");
  // let favoriteMovies = useSelector((state) =>
  //   state.user.favoriteMovies.split(" ")
  // );
  // favoriteMovies.pop();

  // let favoriteTv = "456 52814 92749 ".split(" ");
  // favoriteTv.pop();

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if(id) {
      axios.get(`/api/users/${id}`).then((res) => {
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
      setUserData(user)
    }
  }, [id]);

  return (
    <div className="user-content">
      <div className="user-banner-div">
        <span className="user-nickname">
          {userData.nickName}
        </span>
      </div>

      <div className="favoriteMedia">
        <h2>Favorite movies</h2>
        <div className="cards-div">
          {favoriteMovies.length? favoriteMovies.map((movieId) => {
            return <FavoritesCard movieId={movieId} mediaType={"movie"} />;
          }) : `${userData.nickName} hasn't any favorite movie yet`}
        </div>
        <h2>Favorite Tv Shows</h2>
        <div className="cards-div">
          {favoriteTv.length? favoriteTv.map((tvId) => {
            return <FavoritesCard movieId={tvId} mediaType={"tv"} />;
          }): `${userData.nickName} hasn't any favorite Tv Show yet`}
        </div>
      </div>
    </div>
  );
};

export default Profile;
