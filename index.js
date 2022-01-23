"use strict";

const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.

app.get("/", (req, res) => {
  res.send("Server is online.");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server running on port 3000");
});
