import { Route, Routes } from "react-router";
import Content from "./components/Content";
import Navbar from "./components/Navbar/Navbar";
import Media from "./components/Media";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import SearchListGrid from "./commons/SearchListGrid";
import { persistUser } from "./state/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "./components/Users";
import UserFavorites from "./components/UserFavorites";
import Profile from "./components/Profile/Profile";
import Invitation from "./Invitation";
import UserProfile from "./components/Profile/UserProfile";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(persistUser()).then((user) => {
      console.log(`user es`, user);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="firstFlex">
        <div className="columna">
          <SearchForm />
          <div className="content">
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/media/*" element={<Media />}></Route>
              {!user.id ? (
                <>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                </>
              ) : null}
              <Route
                path={`/media/:mediaType/search/:searchValue`}
                element={<SearchListGrid />}
              />
              <Route path="/user/search" element={<Invitation />}></Route>
              <Route
                path="/user/search/:searchValue"
                element={<Users />}
              ></Route>
              {/* <Route
                path="/*"
                element={<p>Error 404: Page not found</p>}
              ></Route> */}
              {user.id ? (
                <>
                  <Route
                    path="/user/my-favorites/*"
                    element={<UserFavorites />}
                  ></Route>
                </>
              ) : null}
              <Route path="/user/profile" element={<UserProfile />}></Route>
              <Route
                path="/user/profile/:nickName"
                element={<Profile />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
