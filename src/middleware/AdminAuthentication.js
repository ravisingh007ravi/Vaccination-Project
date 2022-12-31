const jwt = require("jsonwebtoken");
const adminModel = require("../model/adminModel");
const errorHandler = require('../errorhandler/errorhandler');

const AdminAuthenticate = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });
    token = token.slice(7);
    jwt.verify(token, "key", function (err, decode) {
      if (err) {
        return res
          .status(401)
          .send({ status: false, message: "Authentication failed" });
      }
      req.decode = decode;
      next();
    });
  } catch (error) {
    return errorHandler(err, res);
  }
};
const AdminAuthorization = async function (req, res, next) {
  try {
    let adminLoggedIn = req.decode;
    let adminId = req.params.adminId;

    let adminAccessing = await adminModel.findById(adminId);
    if (!adminAccessing) {
      return res
        .status(404)
        .send({
          status: false,
          message: "Error! Please check userid and try again",
        });
    }

    if (adminAccessing._id.toString() !== adminLoggedIn.userId) {
      return res
        .status(403)
        .send({ status: false, msg: "Error, authorization failed" });
    }

    next();
  } catch (err) {
    return errorHandler(err, res);
  }
};

module.exports = { AdminAuthenticate, AdminAuthorization };
