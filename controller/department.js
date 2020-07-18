const departmentModel = require('../model/department')

module.exports = {
    index:async(req,res,next)=>{
        try {
            const response = await departmentModel.find()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
     },
     newDepartment:async(req,res,next)=>{
        try {
            
            const department = new departmentModel(req.body)
            const response = await department.save()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    updateDepartment:async(req,res,next)=>{
        try {
            const {id,name} = req.body
            const query = {id:id}
            const response = await departmentModel.findOneAndUpdate(query,{$set:{"name":name}},{ndew:true})
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}