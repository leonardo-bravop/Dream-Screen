import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./UserSearch.css";

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState("");
  const { searchValue } = useParams();

  useEffect(() => {
    setUsers([]);
    setNoResults("");
    setError(false);
    axios
      .get(`/api/user/searchUsers/${searchValue}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        setNoResults("No se encontraron resultados");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
    setLoading(true);
  }, [searchValue]);

  return (
    <>
      <div className="users-wrapper">
        <div id="titlesRowDiv">
          <div className="titleRow">
            <div className="tableColumn columnTitle">NICKNAME</div>
            <span className="tableColumn columnTitle">FAVORITE MOVIES</span>
            <span className="tableColumn columnTitle">FAVORITE TV SHOWS</span>
          </div>
        </div>
        {error && <span>Ups! There was an error, please try again later!</span>}
        {users.length
          ? users.map((user) => {
              let favoriteMovies = user.favoriteMovies.split(" ");
              favoriteMovies.pop();
              let favoriteTv = user.favoriteTv.split(" ");
              favoriteTv.pop();
              return (
                <div className="userRowDiv">
                  <Link to={`/user/profile/${user.nickName}`}>
                    <div className="userRow">
                      <span className="tableColumn">
                        {user.nickName.length > 12
                          ? user.nickName.substring(0, 12) + "..."
                          : user.nickName}
                      </span>
                      <span className="tableColumn">
                        {favoriteMovies.length > 1
                          ? `${favoriteMovies.length} `
                          : `${favoriteMovies.length} `}
                      </span>
                      <span className="tableColumn">
                        {favoriteTv.length > 1
                          ? `${favoriteTv.length} `
                          : `${favoriteTv.length}`}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })
          : noResults}

        {loading && <Spinner size={"3em"} />}
      </div>
    </>
  );
};

export default UserSearch;
