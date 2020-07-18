const positionModel = require('../model/position')

module.exports = {
    index:async(req,res,next)=>{
        try {
            const response = await positionModel.find()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
     },
     newPosition:async(req,res,next)=>{
        try {
            const positionName = new positionModel(req.body)
            const response = await positionName.save()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    updatePosition:async(req,res,next)=>{
        try {
            const {id,name} = req.body
            const query = {id:id}
            const response = await positionModel.findOneAndUpdate(query,{$set:{"name":name}},{ndew:true})
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}