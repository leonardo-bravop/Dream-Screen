import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../components/Spinner";
import Spinner from "../components/Spinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchValue } = useParams();

  useEffect(() => {
    setUsers([])
    axios.get(`/api/users/search/${searchValue}`).then((res) => {
      console.log(`res es`, res);
      setUsers(res.data);
      setLoading(false);
      console.log(`setee a falses`);
    });
    setLoading(true);
    console.log(`setee a true`);
  }, [searchValue]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        
        <table>
          <tbody>
            <tr>
              <th>User nickName</th>
              <th className="tableColumn">Favorite Movies</th>
              <th>Favorite Tv Shows</th>
            </tr>
            {!!users.length && users.map((user) => {
              let favoriteMovies = user.favoriteMovies.split(" ");
              favoriteMovies.pop();
              let favoriteTv = user.favoriteTv.split(" ");
              favoriteTv.pop();
              return (
                <tr>
                  <Link to={`/user/profile/${user.id}`}>
                    <td>{user.nickName}</td>
                  </Link>
                  <td>
                    {favoriteMovies.length > 1
                      ? `${favoriteMovies.length} favorite Movies`
                      : `${favoriteMovies.length} favorite Movie`}
                  </td>
                  <td>
                    {favoriteTv.length > 1
                      ? `${favoriteTv.length} favorite Tv Shows`
                      : `${favoriteTv.length} favorite Tv Show`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && <Spinner />}
      </div>
    </>
  );
};

export default Users;
