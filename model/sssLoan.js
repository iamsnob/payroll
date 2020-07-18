const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sssLoanSchema = new Schema({
    start_date:String,
    end_date:String,
    amount: Number,
    amortization:Number,
    payable_months:Number,
    status:String,
    months:Number,
    reason:String,
    empD_id:{type:Schema.Types.ObjectId,ref:'employeedetail'}
})

module.exports = mongoose.model('sssLoan',sssLoanSchema)