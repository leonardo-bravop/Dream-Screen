import { Route, Routes } from "react-router";
import Movies from "./Movies/Movies";
import TvShows from "./TvShows/TvShows";

const Media = () => {
  return (
    <Routes>
      <Route path="/movie" element={<Movies/>}></Route>
      <Route path="/tv" element={<TvShows/>}></Route>
    </Routes>
  );
};

export default Media