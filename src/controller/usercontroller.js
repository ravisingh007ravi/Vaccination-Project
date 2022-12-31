const userModel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const errorHandler = require("../errorhandler/errorhandler");
const bcrypt = require("bcrypt");
const validation = require("../Validation/validation");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (!validation.isValidPassword(data.password)) {
      return res.status(400).send({
        status: false,
        msg: "Password should contain Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
    data.password = await bcrypt.hash(data.password, 10);
    const createUser = await userModel.create(data);
    return res.status(201).send({ status: true, msg: createUser });
  } catch (err) {
    return errorHandler(err, res);
  }
};
const userLogIn = async (req, res) => {
  try {
    const data = req.body;

    const { PhoneNumber, password } = data;

    const user = await userModel.findOne({ PhoneNumber: PhoneNumber });
    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "This User not register" });

    const checkpasword = await bcrypt.compare(password, user.password);
    if (!checkpasword)
      return res.status(400).send({ message: "Invalid password" });

    let token = jwt.sign(
      {
        userId: user.PhoneNumber.toString(),
      },
      "VaccineRegistration",
      { expiresIn: "12h" }
    );

    return res.status(200).send({
      status: true,
      message: "User login successfull",
      userId: { userId: user._id, token: token },
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
const UpdateUser = async function (req, res) {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const user = await userModel.findById(userId);  // json 
    let timestamp = new Date().getTime();
    const getTime = timestamp - user.createdAt.getTime();
    if (getTime / 1000 > 864000) {
      return res.status(400).send({
        status: false,
        msg: "can't update your profile after 24 hour",
      });
    }
    const updatedData = await userModel.findOneAndUpdate(
      { _id: id },
      { $set:  {...data}  },
      { runValidators: true }
    );
    return res.status(200).send({ status: true, msg: updatedData });
  } catch (err) {
    return errorHandler(err, res);
  }
};

module.exports = { createUser, UpdateUser, userLogIn };
