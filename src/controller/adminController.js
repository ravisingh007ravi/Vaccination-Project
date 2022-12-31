const userModel = require("../model/usermodel");
const adminModel = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const errorHandler = require('../errorhandler/errorhandler');

const userDetails = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const Data = req.query;
    const { Age, PinCode, VaccinationStatus } = Data;
    let filter = {
      Age: Data.Age,
      PinCode: Data.PinCode,
      VaccinationStatus: Data.VaccinationStatus,
    };
    const findUser = await userModel.find(filter);
    return res.status(200).send({ userDetails: findUser });
  } catch (err) {
    return errorHandler(err, res);
  }
};
const loginAdmin = async function (req, res) {
  try {
    let { phone } = req.body;

    let findAdmin = await AdminModel.findOne({ phone: phone });
    if (!findAdmin)
      return res
        .status(400)
        .send({ status: false, message: "Invalid Login Credential" });

    let payload = { userId: findAdmin._id, iat: Date.now() };

    let token = jwt.sign(payload, "key", { expiresIn: "24h" });

    res.setHeader("authorization", token);
    res
      .status(200)
      .send({
        status: true,
        message: "Admin login successfull",
        data: { adminId: findAdmin._id, token },
      });
  } catch (error) {
    return errorHandler(err, res);
  }
};
const updateUserA = async function(req,res )
{
  try{
    let adminId = req.params.adminId
    let userId = req.params.userId
    let data = req.body
    let updateuser = await userModel.findOneAndUpdate( { userId : userId},{ $set : data})

  }
  catch(err)
  {

  }
}
const slotDetails =async (req, res)=>{

  const params=req.params.adminId;
  const Date = req.body.Date
  
  const findUser =await slotModel.find({ Date : Date})

  return res.status(200).send({userDetails:findUser}); 
}
module.exports = {userDetails, loginAdmin}