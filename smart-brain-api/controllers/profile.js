const handleProfile = (req, res, knex) => {
  const { id } = req.params;

  knex
    .select("*")
    .from("users")
    .where({
      id
    })
    .then(users => {
      if (users.length) {
        return res.json(users[0]);
      }

      return res.status(400).json("Not found");
    })
    .catch(err => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfile
};
