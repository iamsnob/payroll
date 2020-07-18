const empDetailModel = require('../model/empDetails')
const employeeModel = require('../model/employee')

module.exports = {
    index:async(req,res,next)=>{
        try {
            const response = await empDetailModel.find().populate('name');
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
     },
     newEmpDetail:async(req,res,next)=>{
        try {
            // const {id} = req.params;
            const employee = req.body;
            // const employeeInfo = await employeeModel.findById(id);
            // employee.name = employeeInfo;

            //save employee
            const newEmployee = new empDetailModel(employee);
            const response = await newEmployee.save();
            if(response){
                const query = {_id:response._id};
                let details = await empDetailModel.findOne(query).populate('name')
                return res.status(200).json(details)
            }

        } catch (error) {
            return res.status(400).json(error);
        } 
    },
    updateEmpDetail:async(req,res,next)=>{
        try {
            const {id} = req.params;
            const query = {_id:id}; 
            const response = await empDetailModel.findOneAndUpdate(query,{ 
                "employed_date": req.body.employed_date,
                "department": req.body.department,
                "position": req.body.position,
                "team_leader": req.body.team_leader,
                "emptype": req.body.emptype,
                "salary": req.body.salary,
                },{new:true})
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    deleteEmpDetails:async(req,res,next)=>{
        try {
            const {id} = req.params;
            const response = await empDetailModel.findByIdAndDelete(id);
            // if(response){
            //     const delE = await employeeModel.findByIdAndDelete({_id:response.name})
            //     if(delE) return res.status(200).json(response)
            // }    
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}