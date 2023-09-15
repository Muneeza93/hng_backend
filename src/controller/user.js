const User = require("../models/user");

exports.create = async (req, res) => {
  const user = await User(req.body);
  try {
    await user.save();
    res.status(201).json({
      message: "ok",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "user data cannot be left blank!",
    });
  }

  const id = req.params.id;

  await User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "User not found",
        });
      } else {
        res.send({
          message: "User updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.delete = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "User not found.",
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
