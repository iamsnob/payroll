const payrollModel = require('../model/payroll')

module.exports = {
    index:async(req,res,next)=>{
        try {
            const response = await payrollModel.find().populate({
                path:'dtr',
                populate:{
                    path:'empD_id',
                    model:'employeedetail',
                    populate:{
                        path:'name',
                        model:'employee'
                    }
                }
            });
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
     },
}