const slotModel = require('../model/covidslotModel')
const userModel = require('../model/usermodel')

const createSlot = async function(req , res)
{
    try{
        let data = req.body
        const createSlot = await userModel.create(data);
        return res.status(201).send({ status: true, msg: createSlot });
    }
    catch(err)
    {
        return res.status(500).send({ status : false , msg : err.message})
    }
}
module.exports = {createSlot}