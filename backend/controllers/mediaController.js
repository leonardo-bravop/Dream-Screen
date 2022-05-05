const axios = require("axios");
require("dotenv").config();
API_KEY = process.env.API_KEY;

exports.getById = (req, res) => {
  const { media, id, language } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&language=${language}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getByState = (req, res) => {
  const { mediaType, state, language, page } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/${mediaType}/${state}?api_key=${API_KEY}&language=${language}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.searchMediaByValue = (req, res) => {
  const { mediaType, searchValue, language, page } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/search/${mediaType}?api_key=${API_KEY}&language=${language}&query=${searchValue}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getTrending = (req, res, next) => {
  const { language, page } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=${language}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};
