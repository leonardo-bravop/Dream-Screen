import { Route, Routes } from "react-router";
import Item from "../../commons/Item/Item";
import Movies from "../Movies/Movies";
import TvShows from "../TvShows/TvShows";

const Media = () => {
  return (
    <Routes>
       <Route path="/movie/*" element={<Movies/>}></Route>
      <Route path="/tv/*" element={<TvShows/>}></Route>
      <Route path="/:media/id/:id" element={<Item />} />
    </Routes>
  );
};

export default Media