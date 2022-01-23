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

// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.
(async () => {
  mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) console.log(err);

    const db = client.db("mortgagebanking");

    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream(
      "./public/attention-hmda-filers-you-need-a-lei_lg.png"
    ).pipe(
      bucket
        .openUploadStream(
          "./public/attention-hmda-filers-you-need-a-lei_lg.png"
        )
        .on("error", (err) => {
          console.log(err);
        })
        .on("finish", () => {
          console.log("done!");
          process.exit(0);
        })
    );
  });
})();
