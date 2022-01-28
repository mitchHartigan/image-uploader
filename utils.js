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

  if (dbNames.length === 0) {
    console.log(
      "MongoDB Image Bucket is empty. Uploading entire /public folder."
    );
    return localNames;
  } else {
    for (let i = 0; i < localNames.length; i++) {
      let currentIndexAccountedFor = false;
      for (let x = 0; x < localNames.length; x++) {
        if (localNames[i] === dbNames[x]) currentIndexAccountedFor = true;
      }
      if (!currentIndexAccountedFor) missingLocalNames.push(localNames[i]);
    }
  }
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

const syncLocalImages = (missingImageNames, client) => {
  missingImageNames.forEach(async (imgName) => {
    try {
      const fullImgPath = addPublicPrefix(imgName);
      DOWNLOAD(fullImgPath, fullImgPath, client);
    } catch (err) {
      console.log(err);
    }
  });
};

const syncDBImages = async (missingImageNames, client) => {
  await missingImageNames.forEach(async (imgName) => {
    const fullImgPath = addPublicPrefix(imgName);
    await UPLOAD(fullImgPath, fullImgPath, client);
  });
  return "Upload completed.";
};

const parseTextFromMarkdown = async (file, callback) => {
  const path = `./markdown/${file}`;

  await fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      console.log(`Failed to parse markdown file ${file}.`);
      process.exit(1);
    }
    callback(data);
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
