const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "HNG-BACKEND API's ",
      description: "hng-backend API documented with swagger",
      contact: {
        name: "HNG internship",
        url: "https://github.com/Muneeza93/hng_backend",
        email: "sebagabomuneeza@gmail.com",
      },
      version: "1.0.1",
    },
    server: [
      {
        url: "http://localhost:3000",
        description: "development server",
      },
    ],
  },
  apis: ["./src/controller/**/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

require("dotenv").config();

const userRoutes = require("./src/routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_uri = mongodb+srv://sebagabomuneeza:sebagabo@cluster0.hp9fmdu.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

app.use("/users", userRoutes);

const port = process.env.PORT || 3000;

app.get("/hng/api", (req, res) => {
  const slack_name = req.query.slack_name;
  const track = req.query.track;

  const response = {
    slack_name,
    current_day: moment().format("dddd"),
    utc_time: moment.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    track,
    github_file_url:
      "https://github.com/Muneeza93/hng_backend/blob/master/index.js",
    github_repo_url: "https://github.com/Muneeza93/hng_backend.git",
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
