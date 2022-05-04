const axios = require("axios");
require("dotenv").config();
apiKey = process.env.apiKey;

exports.getById = (req, res) => {
  const { media, id, language } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${apiKey}&language=${language}`
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
      `https://api.themoviedb.org/3/${mediaType}/${state}?api_key=${apiKey}&language=${language}&page=${page}`
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
      `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&language=${language}&query=${searchValue}&page=${page}`
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
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=${language}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};
