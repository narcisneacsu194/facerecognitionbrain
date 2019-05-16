const handleRegister = (req, res, bcrypt, knex) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const hash = bcrypt.hashSync(password);
  knex
    .transaction(trx => {
      trx
        .insert({
          hash,
          email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name,
              joined: new Date()
            })
            .then(response => {
              res.json(response[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister
};
