const mongoose = require('mongoose')
const Schema = mongoose.Schema

const payrollSchema = new Schema({
    dtr:{type:Schema.Types.ObjectId,ref:'dtr'},
    sssLoan:Number,
    cashAdvance:Number, 
    late:Number,
    overTime:Number,
    regHoliday:Number,
    spcHoliday:Number,
    basicRate:Number,
    grossIncome:Number,
    totalDeductions:Number,
    netPay:Number
})

module.exports = mongoose.model('payroll',payrollSchema)