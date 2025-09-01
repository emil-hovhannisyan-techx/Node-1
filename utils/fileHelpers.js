const fs = require("fs");
const path = require("path");

// Resolve data directory
const dataDir = path.join(__dirname, "..", "data");

function getFilePath(fileName) {
  return path.join(dataDir, fileName);
}

function loadJSON(fileName) {
  try {
    const raw = fs.readFileSync(getFilePath(fileName), "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveJSON(fileName, data) {
  fs.writeFileSync(
    getFilePath(fileName),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

module.exports = { loadJSON, saveJSON };
