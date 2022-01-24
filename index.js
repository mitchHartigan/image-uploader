"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const {
  UPLOAD,
  DOWNLOAD,
  FETCH_ARTICLES,
  FETCH_IMG_METADATA,
} = require("./API");
const {
  getNamesFromImgFolder,
  getNamesFromDatabase,
  getNamesFromDBImgMetadata,
  removePublicPrefix,
  compareLocalImgNamesToDB,
  findMissingLocalImages,
} = require("./utils");
// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.

const main = async () => {
  const dbImages = await FETCH_IMG_METADATA();

  const dbImgNames = await getNamesFromDBImgMetadata(dbImages);
  const localImgNames = await getNamesFromImgFolder("./public");

  findMissingLocalImages(localImgNames, dbImgNames);
};

app.get("/", (req, res) => {
  res.send("Server is online.");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server running on port 3000");
  main();
});
