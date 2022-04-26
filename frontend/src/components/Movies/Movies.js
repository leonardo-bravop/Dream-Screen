import axios from "axios";
import { useEffect, useState } from "react";
import Row from "../Row"

const Movies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const tmdbAPI = "https://api.themoviedb.org/3";
    const apiKey = "46b1d60d45fa9282f81dabe7e845515e";
  
    useEffect(() => {
      axios
        .get(`${tmdbAPI}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then((res) => {
          setPopularMovies(res.data.results);
        });
    }, []);

    return (<Row media={popularMovies}/>)
}

export default Movies