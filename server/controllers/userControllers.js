const { User } = require("#models/User.js");
const { tryCatch } = require("#utils/tryCatch.js");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.dob ||
    !req.body.password
  )
    return res.status(400).json({ eMessage: "need email name dob password" });

  const userData = {
    firstName: req.body.firstName.toUpperCase(),
    lastName: req.body.lastName.toUpperCase(),
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password,
  };

  let user, hashPassword;

  if (
    !/([0-2]{1}[0-9]{1}|3[0-1]{1})[/](0[1-9]|1[0-2])[/]([0-9]{4})/.test(
      userData.dob
    )
  ) {
    return res.status(409).json({ eMessage: "incorrect dob format" });
  }

  user = await tryCatch(User.findOne({ email: userData.email }));
  if (user?.notOkay) return res.status(500).json(user?.error);

  if (user) {
    return res.status(409).json({ message: "user already exists" });
  }

  hashPassword = await tryCatch(bcrypt.hash(userData.password, 10));
  if (hashPassword?.notOkay) return res.status(500).json(hashPassword?.error);

  userData.password = hashPassword;
  user = await tryCatch(User(userData).save());
  if (user?.notOkay) return res.status(500).json(user?.error);

  return res.status(200).json({ message: "user created" });
};

const getUser = async (req, res) => {
  let user;
  user = await tryCatch(User.findOne({ email: req.body.email }));
  if (user?.notOkay) return res.status(500).json(user?.error);
  let userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    email: user.email,
  };
  return res.status(200).json(userData);
};

const updateUser = async (req, res) => {
  let updateData = req.body;
  let user;
  user = await tryCatch(User.findOne({ email: req.body.email }));
  if (user?.notOkay) return res.status(500).json(user?.error);
  let userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    email: user.email,
    password: user.password,
    ...updateData,
  };
  user = await tryCatch(
    User.updateOne({ _id: user._id }, { $set: userData }, { upsert: true })
  );
  if (user?.notOkay) return res.status(500).json(user?.error);
  if (!user) return res.status(200).json({ message: "user not found" });
  return res.status(200).json({ message: "user updated" });
};

const deleteUser = async (req, res) => {
  /**
   * REQUIRED
   *  - req.email
   */
  let user = await tryCatch(User.deleteOne({ email: req.body.email }));
  if (user?.notOkay) return res.status(500).json(user?.error);
  return res.status(200).json({ message: "user Deleted" });
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
