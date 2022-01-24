"use strict";
const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const { rejects } = require("assert");
const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

// Tutorial: https://mongodb.github.io/node-mongodb-native/3.0/tutorials/gridfs/streaming/
const DOWNLOAD = async (dbFileName, localFileName) => {
  mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) console.log(err);

    const db = client.db("mortgagebanking");

    const bucket = new mongodb.GridFSBucket(db, {
      chunkSizeBytes: 1024,
    });

    bucket
      .openDownloadStreamByName(dbFileName)
      .pipe(fs.createWriteStream(localFileName))
      .on("error", (err) => console.log(err))
      .on("finish", () => {
        console.log(`Finished download for ${dbFileName} at ${localFileName}`);
      });
  });
};

const FETCH_ARTICLES = async () => {
  const client = new MongoClient(dbUrl);
  await client.connect();
  const collection = client.db("mortgagebanking").collection("articles");

  const fetchArticles = new Promise((resolve, reject) => {
    try {
      collection.find({}).toArray(async (err, storedDatabaseArticles) => {
        if (err) console.log(err);
        const articles = await storedDatabaseArticles;
        resolve(articles);
      });
    } catch (err) {
      console.log(err);
      reject();
    }
  });

  return await fetchArticles;
};

const UPLOAD = async (localFileName, dbFileName) => {
  mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) console.log(err);

    const db = client.db("mortgagebanking");

    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream(localFileName).pipe(
      bucket
        .openUploadStream(dbFileName)
        .on("error", (err) => console.log(err))
        .on("finish", () => {
          console.log(`Finished upload for ${localFileName} at ${dbFileName}`);
        })
    );
  });
};

module.exports = { UPLOAD, DOWNLOAD, FETCH_ARTICLES };
