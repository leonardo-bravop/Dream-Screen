const axios = require("axios");
tmdbAPI = process.env.tmdbAPI;
apiKey = process.env.apiKey;

exports.getById = (req, res) => {
  const { media, id, language } = req.params;
  axios
    .get(`${tmdbAPI}/${media}/${id}?api_key=${apiKey}&language=${language}`)
    .then(({ data }) => {
      res.send(data);
    });
};

exports.getByState = (req, res) => {
  const { mediaType, state, language, page } = req.params;
  axios
    .get(
      `${tmdbAPI}/${mediaType}/${state}?api_key=${apiKey}&language=${language}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    });
};

exports.searchMediaByValue = (req, res) => {
  const { mediaType, searchValue, language, page } = req.params;
  axios
    .get(
      `${tmdbAPI}/search/${mediaType}?api_key=${apiKey}&language=${language}&query=${searchValue}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    });
};

exports.getTrending = (req, res) => {
  const { language, page } = req.params;
  axios
    .get(
      `${tmdbAPI}/trending/all/day?api_key=${apiKey}&language=${language}&page=${page}`
    )
    .then(({ data }) => {
      res.send(data);
    });
};
