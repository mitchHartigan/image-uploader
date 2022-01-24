const res = require("express/lib/response");
const fs = require("fs");
const { resolve } = require("path");

const getNamesFromDatabase = (articles) => {
  let articleNames = [];

  articles.forEach((article) => {
    articleNames.push(article.name);
  });

  return articleNames;
};

const getNamesFromImages = async (folder) => {
  const imageNames = fs.readdirSync(folder);
  let parsedArticleNames = [];

  imageNames.forEach((imgName) => {
    const ImgNameSlices = imgName.split("_");

    const prefix = ImgNameSlices[0];

    parsedArticleNames.push(prefix);
  });

  // remove duplicates, using Set();
  parsedArticleNames = [...new Set(parsedArticleNames)];
  return parsedArticleNames;
};

module.exports = { getNamesFromDatabase, getNamesFromImages };
