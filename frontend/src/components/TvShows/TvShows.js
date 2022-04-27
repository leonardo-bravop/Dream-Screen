import { useState } from "react";
import MediaRow from "../MediaRow";

const TvShows = () =>{
  const [selected, setSelected] = useState("popular");

    return (
       <>
        <div>
        <h2>Popular Tv Shows:</h2>
      </div>
        <MediaRow mediaType={"tv"} state={selected}/></>
    )
}

export default TvShows;
