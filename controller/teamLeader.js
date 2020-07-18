const teamLeaderModel = require('../model/teamLeader')

module.exports = {
    index:async(req,res,next)=>{
        try {
            const response = await teamLeaderModel.find()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
     },
     newTeamleader:async(req,res,next)=>{
        try {
            const tlName = new teamLeaderModel(req.body)
            const response = await tlName.save()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    updateTeamLeader:async(req,res,next)=>{
        try {
            const {id,name} = req.body
            const query = {id:id}
            const response = await teamLeaderModel.findOneAndUpdate(query,{$set:{"name":name}},{ndew:true})
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}