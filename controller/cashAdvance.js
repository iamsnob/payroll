const cashAdvanceModel = require('../model/cashAdvance')

module.exports =  {
    index:async(req,res,next)=>{
        const response = await cashAdvanceModel.find().populate({
            path:'empD_id',
            populate:{
                path:'name',
                model:'employee'
            }
            });
        if(!response) return res.status(400).json('No data foound');

        return res.status(200).json(response);
    },
    newCashAdvance:async(req,res,next)=>{
        try {
            const {empD_id} = req.body
             //--- check if theres existing Cash Advance balance ---//
             const cashAdvanceBalance = await cashAdvanceModel.find({empD_id:empD_id})
            
             if(cashAdvanceBalance.length){
                 cashAdvanceBalance.forEach(async element =>{
                     if(element.status == "On going payment"){
                         if(element.balance > 0){
                            return res.status(400).json({err:"true",message:"there still on going loan payment"})
                         }else{
                            let cash = req.body
                            cash.status = "On going payment"
                            cash.balance = cash.amount
                            let cashAdvance=  new cashAdvanceModel(cash) 
                            let response = await cashAdvance.save()
                            if(response){
                                const query = {_id:response._id};
                                let details = await cashAdvanceModel.findOne(query).populate({
                                                    path:'empD_id',
                                                    populate:{
                                                        path:'name',
                                                        model:'employee'
                                                    }
                                                })
                                return res.status(200).json(details)
                            }
                         }
                     }
                 })
             }else{
                let cash = req.body
                cash.status = "On going payment"
                cash.balance = cash.amount
                let cashAdvance=  new cashAdvanceModel(cash) 
                let response = await cashAdvance.save();  
                if(response){
                    const query = {_id:response._id};
                    let details = await cashAdvanceModel.findOne(query).populate({
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
    getCashAsdvance:async(req,res,next)=>{
        try {
            const {id} = req.params
            const response = await cashAdvanceModel.find({empD_id:id})
            if(!response) return res.status(200).json('walng Data');
            return res.status(200).json(response); 

        } catch (error) {
            return res.status(400).json(error)
        } 
    }
}

//-- Note No update code --//