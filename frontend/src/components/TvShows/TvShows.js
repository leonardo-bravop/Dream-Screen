import axios from "axios";
import { useEffect, useState } from "react";
import Row from "../Row"

const TvShows = () => {
    const [popularTvShows, setPopularTvShows] = useState([]);
    const tmdbAPI = "https://api.themoviedb.org/3";
    const apiKey = "46b1d60d45fa9282f81dabe7e845515e";
  
    useEffect(() => {
      axios
        .get(`${tmdbAPI}/tv/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then((res) => {
            setPopularTvShows(res.data.results);
        });
    }, []);

    return (<Row media={popularTvShows}/>)
}

export default TvShows