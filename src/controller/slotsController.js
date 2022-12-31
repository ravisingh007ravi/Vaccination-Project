const slotModel = require("../model/covidslotModel");
const userModel = require("../model/usermodel");
const errorHandler = require('../errorhandler/errorhandler');

const createSlot = async function (req, res) {
  try {
    let data = req.body;
    data["slots"] = [];
    let startTime = 10;    
    for (let i = 0; i < 7; i++) {
      let x = "00";
      for (let j = 1; j <= 2; j++) {
        {
          data["slots"].push({ slotsTime: `${startTime}:${x}`, patients: [] });
          x = "30";
        }
      }
      startTime = startTime + 1;
    }
    const createSlot = await slotModel.create(data);
    return res.status(201).send({ status: true, msg: createSlot });
  } catch (err) {
    return errorHandler(err, res);
  }
};
const bookSlot = async function (req, res) {
  try {
    let userId = req.params.userId;
    let slotId = req.params.slotId; // add pincode and hospital 
    let slotsTime = req.body.slotsTime;
    let slot = await slotModel.findById(slotId).lean();  
    for (let i = 0; i < slot["slots"].length; i++) {
      if (slotsTime == slot["slots"][i].slotsTime) {
        if (slot["slots"][i].slotsBooked > 9) {
          return res.status(400).send({
            status: false,
            msg: "slots are full for this timeSlot please try Other time slot",
          });
        }
        slot["slots"][i].patients.push(userId);
        slot["slots"][i].slotsBooked += 1;
      }
    }
    const slotBook = await slotModel.findOneAndUpdate(
      { _id: slotId },
      { $set: { ...slot } },
      { runValidators: true }
    );
    return res
      .status(201)
      .send({ status: true, msg: slotBook });
  } catch (err) {
    return errorHandler(err, res);
  }
};
module.exports = { createSlot, bookSlot };
