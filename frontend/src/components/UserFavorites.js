import { useSelector } from "react-redux";
import FavoritesCard from "../commons/FavoritesCard";
import Grid from "./Grid";

const UserFavorites = () => {
    let favoriteMovies = useSelector((state) =>
    state.user.favoriteMovies.split(" ")
  );
  favoriteMovies.pop();
//   favoriteMovies = favoriteMovies.slice(0, 6);

  let favoriteTv = useSelector((state) => state.user.favoriteTv.split(" "));
  favoriteTv.pop();
//   favoriteTv = favoriteTv.slice(0, 6);

  return (
    <div>
      <div >
        <form style={{display: "flex"}}>
          <div>
            <input type="radio" name="media"></input>
            <label>All</label>
          </div>

          <div>
            <input type="radio" name="media"></input>
            <label>Fav Movies</label>
          </div>
          <div>
            <input type="radio" name="media"></input>
            <label>Fav Tv Shows</label>
          </div>
        </form>
      </div>
      <h2>Favorites</h2>
      <h3>Favorite Movies</h3>
      <div className="favoriteMovies">
        {favoriteMovies.map((movieId) => {
          return <FavoritesCard movieId={movieId} mediaType={"movie"} />;
        })}
      </div>
      <h3>Favorite Tv Shows</h3>

      <div className="favoriteTv">
        {favoriteTv.map((movieId) => {
          return <FavoritesCard movieId={movieId} mediaType={"tv"} />;
        })}
      </div>
      {/* <Grid/> */}
    </div>
  );
};

export default UserFavorites;
