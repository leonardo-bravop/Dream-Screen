import { Route, Routes } from "react-router";
import Content from "./components/Content";
import Navbar from "./components/Navbar/Navbar";
import Media from "./components/Media";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Register from "./components/Register/Register";
import Login from "./components/Login";
import Item from "./commons/Item";
import SearchListGrid from "./commons/SearchListGrid";
import { persistUser } from "./state/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "./components/Users";
import UserFavorites from "./components/UserFavorites";

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
              <Route
                path="/user/search"
                element={<p>Search any user on Dream Screen!</p>}
              ></Route>
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
                    path="/user/my-favorites"
                    element={<UserFavorites />}
                  ></Route>
                </>
              ) : null}
              <Route path="/media/:media/:id" element={<Item />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
