import { Route, Routes } from "react-router";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Media from "./components/Media"
import "./App.css"
import SearchForm from "./components/SearchForm";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="firstFlex">
        <div className="columna">
          <SearchForm/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/media/" element={<Media/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
