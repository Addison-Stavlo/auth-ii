require("dotenv").config();

const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

//--- define functions
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "60m"
  };

  return jwt.sign(payload, secret, options);
}

//--middlewares
function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: `not logged in.. GET A TOKEN! I DONT WANT COOKIES!` });
  }
}
//--- routes
server.get("/", (req, res) => {
  res.status(200).json("API up and Running... go catch it?");
});

server.get("/users", (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => res.status(200).json(users));
});

server.post("/api/register", (req, res) => {
  const userInfo = req.body;
  userInfo.password = bcrypt.hashSync(userInfo.password, 12);

  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/login", (req, res) => {
  db("users")
    .where({ username: req.body.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "nope..." });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = server;