"use strict";
const mongodb = require("mongodb");
const fs = require("fs");

// Tutorial: https://mongodb.github.io/node-mongodb-native/3.0/tutorials/gridfs/streaming/
const UPLOAD = async (localFileName, dbFileName, client) => {
  return new Promise((resolve, reject) => {
    const db = client.db("mortgagebanking");

    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream(localFileName).pipe(
      bucket
        .openUploadStream(dbFileName)
        .on("error", (err) => console.log("err?", err))
        .on("finish", () => {
          console.log(`Finished upload for ${localFileName} at ${dbFileName}`);
          resolve();
        })
    );
  });
};

const DOWNLOAD = async (dbFileName, localFileName, client) => {
  return new Promise((resolve, reject) => {
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
        resolve();
      });
  });
};

const FETCH_ARTICLES = async (client) => {
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

const FETCH_IMG_METADATA = async (client) => {
  const collection = client.db("mortgagebanking").collection("fs.files");
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

module.exports = { UPLOAD, DOWNLOAD, FETCH_ARTICLES, FETCH_IMG_METADATA };
