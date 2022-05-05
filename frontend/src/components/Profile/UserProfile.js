import "./Profile.css";
import { useSelector } from "react-redux";
import FavoritesCard from "../../commons/FavoritesCard/FavoritesCard";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);

  useEffect(() => {
    if (user.favoriteMovies) {
      let favMovies = user.favoriteMovies.split(" ");
      favMovies.pop();
      if(favMovies.length>18) {
        favMovies = favMovies.slice(0,18)
      }
      setFavoriteMovies(favMovies);
    }
    if (user.favoriteTv) {
      let favTv = user.favoriteTv.split(" ");
      favTv.pop();
      if(favTv.length>18) {
        favTv = favTv.slice(0,17)
      }
      setFavoriteTv(favTv);
    }
  }, [user.favoriteMovies, user.favoriteTv]);

  return (
    <div className="user-content">
      <div className="user-banner-div">
        <span className="user-nickname">
          {user.nickName}
        </span>
      </div>

      <div className="favoriteMedia">
        <h2>Favorite movies</h2>
        <div className="cards-div">
          {favoriteMovies.length? favoriteMovies.map((movieId) => {
            return <FavoritesCard mediaId={movieId} mediaType={"movie"} key={movieId}/>;
          }) : `You don't have any favorite movie yet. Search movies and start creating your collection!`}
        </div>
        <h2>Favorite Tv Shows</h2>
        <div className="cards-div">
          {favoriteTv.length? favoriteTv.map((tvId) => {
            return <FavoritesCard mediaId={tvId} mediaType={"tv"} />;
          }): `You don't have any favorite TV Show yet. Search Tv Shows and start creating your collection!`}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
