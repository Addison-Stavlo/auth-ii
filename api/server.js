require("dotenv").config();

const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

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

module.exports = server;
