import { Route, Routes } from "react-router";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Media from "./components/Media";
import "./App.css";
import SearchForm from "./components/SearchForm";
import Register from "./components/Register";
import Login from "./components/Login";
import Item from "./commons/Item";
import useInput from "./hooks/useInput";
import SearchListGrid from "./commons/SearchListGrid";

const App = () => {
  const search = useInput();

  return (
    <>
      <Navbar />
      <div className="firstFlex">
        <div className="columna">
          <SearchForm search={search} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/media/*" element={<Media />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/:media/:id" element={<Item />} />
              <Route
                path={`/search/:mediaType/:searchValue`}
                element={<SearchListGrid/>}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
