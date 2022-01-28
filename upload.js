"use strict";

const dbUrl = `mongodb+srv://admin:bjX2dGUEnrK4Zyd@cluster0.vl3pn.mongodb.net/food?retryWrites=true&w=majority`;

const { MongoClient } = require("mongodb");
const fs = require("fs");
const { UPLOAD, DOWNLOAD } = require("./API");
const client = new MongoClient(dbUrl);

(async () => {
  client.connect(async (err) => {
    if (err) {
      console.log("Error connecting to database. Please try again.");
      console.log(err);
    }

    const markdown = await getNamesFromMarkdownFolder();
    console.log(markdown);

    // markdown.forEach(async (file) => {
    //   const path = `./markdown/${file}`;
    //   await UPLOAD(path, file, client);
    // });

    markdown.forEach(async (file) => {
      await DOWNLOAD(file, `./downloads/markdown/${file}`, client);
    });

    // if (markdown) {
    //   const upload = await uploadMarkdown();
    //   console.log(upload);
    //   process.exit(0);
    // }
  });
})();

const getNamesFromMarkdownFolder = () => {
  return fs.readdirSync("./markdown");
};
