import axios from "axios";
import { useEffect, useState } from "react";
import ResponsiveGrid from "./ResponsiveGrid";
import Spinner from "./Spinner";

const MediaRow = ({ mediaType, state }) => {
  const [media, setMedia] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const apiKey = "46b1d60d45fa9282f81dabe7e845515e";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${tmdbAPI}/${mediaType}/${state}?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setMedia(res.data.results);
        setLoading(false);
      });
    setLoading(true);
    console.log(`true`);
  }, [state]);

  return (
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "0 15%"}}>
      {loading && <div style={{position: "absolute", marginTop: "20px"}}><Spinner /></div>}
      {!loading && <ResponsiveGrid media={media} />}

    </div>
  );
};
export default MediaRow;
