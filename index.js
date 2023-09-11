const express = require("express");
const moment = require("moment");
const app = express();
const port = process.env.PORT || 3000;

app.get("/hng/api", (req, res) => {
  const slack_name = req.query.slack_name;
  const track = req.query.track;

  const response = {
    slack_name,
    current_day: moment().format("dddd"),
    utc_time: moment.utc().format(),
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
