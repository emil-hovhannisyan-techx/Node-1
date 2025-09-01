const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

const doc = {
  info: {
    title: "Students & Classes API",
    description: "API for managing students and classes",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
