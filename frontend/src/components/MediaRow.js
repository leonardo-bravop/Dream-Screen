import axios from "axios";
import { useEffect, useState } from "react";
import Row from "./Row";
import Spinner from "./Spinner";

const MediaRow = ({ mediaType }) => {
  const [popularMedia, setPopularMedia] = useState([]);
  const tmdbAPI = "https://api.themoviedb.org/3";
  const apiKey = "46b1d60d45fa9282f81dabe7e845515e";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${tmdbAPI}/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setPopularMedia(res.data.results);
        setLoading(false);
      });
    setLoading(true);
    console.log(`true`);
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <Row media={popularMedia} />}
    </>
  );
};
export default MediaRow;
