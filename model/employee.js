const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:String,
    bday:String,
    sss_no:String,
    philhealth_no:String,
    tin_no:String,
    hdmf:String,
    contact_no:String,
    address:{
        current_add:String, 
        provincial_add:String   
    },
    guardian:String,
    guardian_no:String
})

module.exports = mongoose.model('employee',employeeSchema);