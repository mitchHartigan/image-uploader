const fs = require("fs");
const { DOWNLOAD, UPLOAD } = require("./API");

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

const addPublicPrefix = (fileName) => {
  return `./public/${fileName}`;
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

const findMissingDBImages = (localNames, dbNames) => {
  let missingDBNames = [];
  let accountedForDBNames = [];

  dbNames.forEach((dbName) => {
    localNames.forEach((localName) => {
      if (dbName === localName) accountedForDBNames.push(localName);
      else missingDBNames.push(localName);
    });
  });

  return missingDBNames;
};

const syncLocalImages = (missingImageNames) => {
  missingImageNames.forEach(async (imgName) => {
    try {
      const fullImgPath = addPublicPrefix(imgName);
      await DOWNLOAD(fullImgPath, fullImgPath);
    } catch (err) {
      console.log(err);
    }
  });

  console.log("Finished syncing images.");
};

const syncDBImages = (missingImageNames) => {
  missingImageNames.forEach(async (imgName) => {
    try {
      const fullImgPath = addPublicPrefix(imgName);
      await UPLOAD(fullImgPath, fullImgPath);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  getNamesFromDatabase,
  getNamesFromImgFolder,
  getNamesFromDBImgMetadata,
  addPublicPrefix,
  removePublicPrefix,
  syncLocalImages,
  syncDBImages,
  findMissingLocalImages,
  findMissingDBImages,
};
