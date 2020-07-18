const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empSchema = new Schema({
    name:{type:Schema.Types.ObjectId,ref:'employee'},
    department:String,
    position:String,
    team_leader:String,
    emptype:String,
    employed_date:String,
    salary:Number,
    daily_rate:Number,
    deductions:{
        sss:Number,
        philhealth:Number,
        hdmf:Number,
        tax:Number
    }
})

module.exports = mongoose.model('employeedetail', empSchema)