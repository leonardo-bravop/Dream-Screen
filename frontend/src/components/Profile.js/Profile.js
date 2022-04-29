import "./Profile.css";
import { useSelector } from "react-redux";
import FavoritesCard from "../../commons/FavoritesCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  let favoriteMovies = "639933 634649 414906 634 534 300 1498 ".split(" ");
  // let favoriteMovies = useSelector((state) =>
  //   state.user.favoriteMovies.split(" ")
  // );
  favoriteMovies.pop();
  
  let favoriteTv = "456 52814 92749 ".split(" ");
  favoriteTv.pop();

  return (
    <div className="user-content">
      <div className="user-banner-div">
        <img
          src="https://newevolutiondesigns.com/images/freebies/blue-facebook-cover-1.jpg"
          className="user-banner-img"
        ></img>
      </div>
      <div className="user-header-div">
        <img
          src={"https://www.lunapic.com/editor/premade/o-ginger.gif"}
          className="user-picture"
        />
        <span className="user-nickname">
          {/* {user.nickName} */}
          leo
        </span>
      </div>
      <div className="favoriteMedia">
        <h2>Favorite movies</h2>
        <div className="cards-div">
          {favoriteMovies.map((movieId) => {
            return <FavoritesCard movieId={movieId} mediaType={"movie"} />;
          })}
        </div>
        <h2>Favorite Tv Shows</h2>
        <div className="cards-div">
          {favoriteTv.map((tvId) => {
            return <FavoritesCard movieId={tvId} mediaType={"tv"} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
