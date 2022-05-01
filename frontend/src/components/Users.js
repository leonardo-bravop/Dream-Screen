import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../components/Spinner";
import Spinner from "../components/Spinner";
import "./UserSearch.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchValue } = useParams();

  useEffect(() => {
    setUsers([]);
    axios.get(`/api/users/search/${searchValue}`).then((res) => {
      console.log(`res es`, res);
      if(!res.data) 
      setUsers(res.data);
      setLoading(false);
      console.log(`setee a falses`);
    });
    setLoading(true);
    console.log(`setee a true`);
  }, [searchValue]);

  return (
    <>
      <div
        className="users-wrapper"
      >
        <div id="titlesRowDiv">
          <div className="titleRow">
            <div className="tableColumn columnTitle">NICKNAME</div>
            <span className="tableColumn columnTitle">FAVORITE MOVIES</span>
            <span className="tableColumn columnTitle">FAVORITE TV SHOWS</span>
          </div>
        </div>
        {!!users.length &&
          users.map((user) => {
            let favoriteMovies = user.favoriteMovies.split(" ");
            favoriteMovies.pop();
            let favoriteTv = user.favoriteTv.split(" ");
            favoriteTv.pop();
            return (
              <div className="userRowDiv">
              
              <Link to={`/user/profile/${user.id}`}>
                <div className="userRow">
                  <span className="tableColumn">{user.nickName}</span>
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
          })}

        {loading && <Spinner />}
      </div>
    </>
  );
};

export default Users;
