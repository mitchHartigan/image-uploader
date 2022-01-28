"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const client = new MongoClient(dbUrl);

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
  findMissingDBImages,
  syncLocalImages,
  syncDBImages,
} = require("./utils");
// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.

const main = () => {
  const command = process.argv[2];
  const environment = process.argv[3];

  if (command === "upload-img-folder") {
    uploadPublicFolder();
  }

  if (command === "download-img-folder") {
  }

  if (command === "upload-one-img") {
  }

  if (command === "download-one-img") {
  }
};

const uploadPublicFolder = () => {
  client.connect(async (err) => {
    if (err) {
      console.log("Error connecting to database. Details below:");
      console.log(err);
    }

    const dbImages = await FETCH_IMG_METADATA(client);
    const dbImgNames = await getNamesFromDBImgMetadata(dbImages);
    const localImgNames = await getNamesFromImgFolder("./public");

    const unSyncedLocalImages = findMissingLocalImages(
      localImgNames,
      dbImgNames
    );

    if (unSyncedLocalImages) {
      const upload = await syncDBImages(unSyncedLocalImages, client);
      console.log(upload);
      process.exit(0);
    }
  });
};

app.get("/", (req, res) => {
  res.send("Server is online.");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server running on port 3000");
  main();
});
