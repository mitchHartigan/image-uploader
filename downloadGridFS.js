"use strict";

const { MongoClient, MongoDBNamespace } = require("mongodb");
const mongodb = require("mongodb");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Tutorial: https://mongodb.github.io/node-mongodb-native/3.0/tutorials/gridfs/streaming/
(async () => {
  mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) console.log(err);

    const db = client.db("mortgagebanking");

    const bucket = new mongodb.GridFSBucket(db, {
      chunkSizeBytes: 1024,
    });

    bucket
      .openDownloadStreamByName(
        "./public/attention-hmda-filers-you-need-a-lei_lg.png"
      )
      .pipe(fs.createWriteStream("./public/downloaded_file.png"))
      .on("error", (err) => {
        console.log(err);
      })
      .on("finish", () => {
        process.exit(0);
      });
  });
})();
