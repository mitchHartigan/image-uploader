"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { UPLOAD, DOWNLOAD, FETCH_ARTICLES } = require("./API");
const { getNamesFromImages, getNamesFromDatabase } = require("./utils");
// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.

const main = async () => {
  const articles = await FETCH_ARTICLES();
  const datbaseNames = getNamesFromDatabase(articles);
  const imageNames = getNamesFromImages("./public");

  console.log(datbaseNames);
  console.log(imageNames);
};

app.get("/", (req, res) => {
  res.send("Server is online.");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server running on port 3000");
  main();
});
