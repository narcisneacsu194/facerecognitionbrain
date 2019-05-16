const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "7d41e80df07a481daa943066dc4054f4"
});

const detectFace = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => {
      res.json(response);
    });
};

const handleImage = (req, res, knex) => {
  const { id } = req.body;

  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  detectFace
};
