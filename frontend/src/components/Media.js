import { Route, Routes } from "react-router";

const Media = () => {
  return (
    <Routes>
      <Route path="/movie" element={<p>Popular Movies</p>}></Route>
      <Route path="/tv" element={<p>Popular Tv Shows</p>}></Route>
    </Routes>
  );
};

export default Media