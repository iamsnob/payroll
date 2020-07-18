const employeeModel =  require('../model/employee')

module.exports = {
    index:async(req,res,next)=>{
        const response = await employeeModel.find();
        if(!response) return res.status(400).json('No data foound');

        return res.status(200).json(response);
    },
    newEmployee:async(req,res,next)=>{
        try {
            const employee = new employeeModel(req.body);
            const response = await employee.save();  
            return res.status(200).json(response);  
        } catch (error) {
            return res.status(400).json(error)
        } 
    },
    getEmployee:async(req,res,next)=>{
        try {
            const param = req.params.id;
            const body = req.body;
            const query = {_id:param};
            const response = await employeeModel.findOne(query);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    updateEmployee:async(req,res,next)=>{
        try {
            const param = req.params.id;
            const body = req.body;
            const query = {_id:param};
            const response = await employeeModel.findOneAndUpdate(query,{$set:{body},new:true});
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    deleteEmployee:async(req,res,next)=>{
        try{
            const param = req.params.id;
            const query = {_id:param};  
            const deleteEmpInfo = await employeeModel.findOneAndDelete(query)
            if(deleteEmpInfo){
                try {
                   // const response = await empDetail.findOneAndDelete({name:{_id:deleteEmpInfo._id}})
                    return res.status(200).json(response)
                } catch (error) {
                    return res.status(400).json(error)
                } 
            }
        }catch(error){
            return res.status(400).json(error);
        }

    }
}