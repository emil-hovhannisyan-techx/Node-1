const http = require("http");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const chalk = require("chalk");
const _ = require("lodash");

const { loadJSON, saveJSON } = require("./utils/fileHelpers");
const { sendJSON, sendHTML } = require("./utils/response");
const { parseJSONBody } = require("./utils/bodyParser");
const { AppError, NotFoundError, ValidationError } = require("./utils/errors");

// Load data (empty at first)
let students = loadJSON("students.json");
let classes = loadJSON("classes.json");

// Creating server
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const method = req.method.toUpperCase();

  try {
    if (pathname === "/" && method === "GET") {
      return sendHTML(
        res,
        200,
        `<h1>Welcome to the Students & Classes API</h1>`
      );
    }

    // Students
    if (pathname === "/students" && method === "GET") {
      return sendJSON(res, 200, students);
    }
    if (pathname === "/students/random" && method === "GET") {
      if (students.length === 0)
        throw new NotFoundError("No students available");
      return sendJSON(res, 200, _.sample(students));
    }
    if (pathname === "/students" && method === "POST") {
      const body = await parseJSONBody(req);
      if (!body.name || typeof body.name !== "string") {
        throw new ValidationError("Student name is required");
      }
      const newStudent = { id: uuidv4(), name: body.name.trim() };
      students.push(newStudent);
      saveJSON("students.json", students);
      return sendJSON(res, 201, {
        message: "Student created",
        student: newStudent,
      });
    }

    // Classes
    if (pathname === "/classes" && method === "GET") {
      return sendJSON(res, 200, classes);
    }
    if (pathname === "/classes/random" && method === "GET") {
      if (classes.length === 0) throw new NotFoundError("No classes available");
      return sendJSON(res, 200, _.sample(classes));
    }
    if (pathname === "/classes" && method === "POST") {
      const body = await parseJSONBody(req);
      if (!body.name || typeof body.name !== "string") {
        throw new ValidationError("Class name is required");
      }
      const newClass = { id: uuidv4(), name: body.name.trim() };
      classes.push(newClass);
      saveJSON("classes.json", classes);
      return sendJSON(res, 201, { message: "Class created", class: newClass });
    }

    throw new NotFoundError();
  } catch (err) {
    if (err instanceof AppError) {
      return sendJSON(res, err.statusCode, { error: err.message });
    }
    console.error(chalk.red("Unexpected Error:"), err);
    return sendJSON(res, 500, { error: "Internal Server Error" });
  }
});

// Start server
const PORT = 3000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(chalk.green(`🚀 Server running at http://localhost:${PORT}`));
  console.log(
    chalk.green(`🌐 Accessible on network at http://10.10.20.70:${PORT}`)
  );
});
