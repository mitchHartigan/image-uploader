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

function base64Encode(imgPath) {
  return `data:image/png;base64,${fs.readFileSync(imgPath, "base64")}`;
}

// Query the articles array from the database. Create a new object for each article,
// deleting the existing _id, and overriding the imgSm, imgMd, imgLg properties.
(async () => {
  var updatedArticles = [];

  const client = new MongoClient(dbUrl);
  await client.connect();
  const collection = client.db("mortgagebanking").collection("articles");

  collection.find({}).toArray(async (err, storedDatabaseArticles) => {
    if (err) console.log("database error:", err);

    try {
      storedDatabaseArticles.forEach((article) => {
        // const name = article.name;

        const updatedArticle = {
          ...article,
          // imgSm: base64Encode(`./public/${name}_sm.png`),
          // imgMd: base64Encode(`./public/${name}_md.png`),
          // imgLg: base64Encode(`./public/${name}_lg.png`),
        };

        delete updatedArticle._id;
        delete updatedArticle.imgSm;
        delete updatedArticle.imgMd;
        delete updatedArticle.imgLg;

        console.log("updated article", updatedArticle);

        updatedArticles.push(updatedArticle);
      });

      // write the new json Array to articles.json locally. If articles.json
      // does not exist, writeFileSync will create it and write to it.
      fs.writeFileSync("articles.json", JSON.stringify(updatedArticles));
      console.log("Generated base64 images for each article in the database.");
    } catch (err) {
      console.log("Failed to generate. Check error:");
      console.log(err);
    }
  });
})();
