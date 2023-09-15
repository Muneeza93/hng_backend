const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const app = express();

const userRoutes = require("./src/routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hng";

mongoose
  .connect(uri, {
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
