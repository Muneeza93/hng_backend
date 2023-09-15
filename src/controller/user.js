const User = require("../models/user");

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *         type: object
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - role
 *         properties:
 *           _id:
 *              type: integer
 *              description: auto-generaed id for user
 *           firstName:
 *                    type: string
 *                    description: user's first name
 *           lastName:
 *                   type: string
 *                   description: user's last name
 *           email:
 *                type: string
 *                description: email address of user
 *           role:
 *                      type: string
 *                      description: role of user
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User managing API
 */

/**
 * @swagger
 * /users/create:
 *  post:
 *   summary: create new user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/User'
 *   responses:
 *     "201":
 *       description: Registration successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     "403":
 *       description: User with this email already exists
 */
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

/**
 * @swagger
 * /users:
 *   get:
 *      description: return list of users
 *      tags: [User]
 *      responses:
 *         "200":
 *              description: user
 *              content:
 *                application/json:
 *                   schema:
 *                     $ref: '#components/schemas/User'
 */

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

/**
 * @swagger
 * /users/:id:
 *   get:
 *      description: return user by id
 *      tags: [User]
 *      responses:
 *         "200":
 *              description: user
 *              content:
 *                application/json:
 *                   schema:
 *                     $ref: '#components/schemas/User'
 */

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

/**
 * @swagger
 * /users/:id:
 *   patch:
 *      description: update user by id
 *      tags: [User]
 *      responses:
 *         "200":
 *              description: user
 *              content:
 *                application/json:
 *                   schema:
 *                     $ref: '#components/schemas/User'
 */

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
