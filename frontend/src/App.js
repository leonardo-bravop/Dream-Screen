import { Route, Routes } from "react-router";
import "./App.css";
import Content from "./components/Content/Content";
import Navbar from "./components/Navbar/Navbar";
import Media from "./components/Media/Media";
import SearchForm from "./components/SearchForm/SearchForm";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import SearchListGrid from "./commons/SearchListGrid";
import UserSearch from "./components/UserSearch/UserSearch";
import UserFavorites from "./components/UserFavorites/UserFavorites";
import Profile from "./components/Profile/Profile";
import Invitation from "./components/Invitation/Invitation";
import UserProfile from "./components/Profile/UserProfile";
import { persistUser } from "./state/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(persistUser()).then((user) => {});
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
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path={`/media/:mediaType/search/:searchValue`}
                element={<SearchListGrid />}
              />
              <Route path="/user/search" element={<Invitation />}></Route>
              <Route
                path="/user/search/:searchValue"
                element={<UserSearch />}
              ></Route>
              {user.id ? (
                <>
                  <Route
                    path="/user/my-favorites/*"
                    element={<UserFavorites />}
                  ></Route>
                  <Route path="/user/profile" element={<UserProfile />}></Route>
                </>
              ) : null}
              <Route
                path="/user/profile/:nickName"
                element={<Profile />}
              ></Route>
              <Route
                path="/*"
                element={
                  <h1>
                    Error 404: Nothing here, please go to a valid route :)
                  </h1>
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
