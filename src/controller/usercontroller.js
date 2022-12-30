const userModel = require("../model/usermodel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    const createUser = await userModel.create(data);
    return res.status(201).send({ status: true, msg: createUser });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
const UpdateUser = async function (req, res) {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    let timestamp = new Date().getTime();
    const getTime = timestamp - user.createdAt.getTime();
    if (getTime / 1000 < 864000) {
      return res
        .status(400)
        .send({ status: false, msg: "you are not allowed to do this action" });
    }
    const updatedData = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { runValidators: true })
    return res.status(200).send({ status: true, msg: updatedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createUser, UpdateUser };
