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

const getNamesFromImgFolder = async (folder) => {
  const imageNames = fs.readdirSync(folder);
  let parsedArticleNames = [];

  imageNames.forEach((imgName) => {
    const prefix = imgName;

    parsedArticleNames.push(prefix);
  });

  // remove duplicates, using Set();
  return parsedArticleNames;
};

const getNamesFromDBImgMetadata = (imageMetadata) => {
  let parsedFilenames = [];

  imageMetadata.forEach((img) => {
    parsedFilenames.push(removePublicPrefix(img.filename));
  });

  return parsedFilenames;
};

const removePublicPrefix = (fullPath) => {
  return fullPath.split("/")[2];
};

const findMissingLocalImages = (localNames, dbNames) => {
  let missingLocalNames = [];
  let accountedForLocalNames = [];

  localNames.forEach((localName) => {
    dbNames.forEach((dbName) => {
      if (localName === dbName) accountedForLocalNames.push(localName);
      else missingLocalNames.push(localName);
    });
  });

  return missingLocalNames;
};

module.exports = {
  getNamesFromDatabase,
  getNamesFromImgFolder,
  getNamesFromDBImgMetadata,
  removePublicPrefix,
  findMissingLocalImages,
};
