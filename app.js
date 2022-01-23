"use strict";

const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function base64Encode(imgPath) {
  return `data:image/png;base64,${fs.readFileSync(imgPath, "base64")}`;
}

async function main() {
  const client = new MongoClient(dbUrl);
  await client.connect();
  const collection = client.db("mortgagebanking").collection("articles");
  var updatedArticles = [];

  (async () => {
    collection.find({}).toArray(async (err, storedDatabaseArticles) => {
      if (err) console.log(err);

      storedDatabaseArticles.forEach((article) => {
        const name = article.name;

        const updatedArticle = {
          ...article,
          imgSm: base64Encode(`./public/${name}_sm.png`),
          imgMd: base64Encode(`./public/${name}_md.png`),
          imgLg: base64Encode(`./public/${name}_lg.png`),
        };
        delete updatedArticle._id;
        updatedArticles.push(updatedArticle);
      });

      const files = await fs.promises.readdir("./public");

      var newFiles = [];
      files.forEach((filename) => {
        let splitString = filename.split("_");
        const slicedName = splitString[0];
        newFiles.push(slicedName);
      });

      const imageNames = [...new Set(newFiles)];

      // parses the array for duplicates.
      console.log([...new Set(newFiles)]);
      console.log(updatedArticles);
      fs.writeFileSync("articles.json", JSON.stringify(updatedArticles));
    });
  })();
}

main();

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
