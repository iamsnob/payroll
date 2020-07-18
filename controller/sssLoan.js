const sssLoanModel = require('../model/sssLoan')

module.exports =  {
    index:async(req,res,next)=>{
        const response = await sssLoanModel.find().populate({
            path:'empD_id',
            populate:{
            path:'name',
            model:'employee'
            }
        });
        if(!response) return res.status(400).json('No data foound');

        return res.status(200).json(response);
    },
    newLoan:async(req,res,next)=>{
        try {
            //-- note: id/empD_id is refer to employee details id --//
            const {empD_id} = req.body

            //--- check if theres is existing SSS Loan balance ---//
            const sssBalance = await sssLoanModel.find({empD_id:empD_id})
        

            if(sssBalance.length){
                sssBalance.forEach(async element =>{
                    if(element.status == 'On going payment'){
                        if(element.payable_months > element.months){
                            return res.status(200).json({err:"true",message:"this still on going loan payament"})
                        }
                    }else{
                        let loan = req.body
                        loan.status = "On going payment"
                        loan.months = 0
                        let sssLoan =  new sssLoanModel(loan) 
                        let response = await sssLoan.save();  
                        if(response){
                            const query = {_id:response._id};
                            let details = await sssLoanModel.findOne(query).populate({
                                                path:'empD_id',
                                                populate:{
                                                path:'name',
                                                model:'employee'
                                                }
                                            })
                            return res.status(200).json(details)
                        }
                    }
                })
            }else{
                let loan = req.body
                loan.status = "On going payment"
                loan.months = 0
                let sssLoan =  new sssLoanModel(loan) 
                let response = await sssLoan.save();  
                if(response){
                    const query = {_id:response._id};
                    let details = await sssLoanModel.findOne(query).populate({
                                        path:'empD_id',
                                        populate:{
                                        path:'name',
                                        model:'employee'
                                        }
                                    })
                    return res.status(200).json(details)
                }
            }
        } catch (error) {
            return res.status(400).json(error)
        } 
    },
    updateLoan:async(req,res,next)=>{
        try {
            const {id} =  req.params.id
            const status = "Paid - Remaining Balance - New Application"
            const {reason} =  req.body
            const query = {id:id}
            const responce = sssLoanModel.findOneAndUpdate(query,{$set:{"status":reason}},{new:true})
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error) 
        }
    }
}