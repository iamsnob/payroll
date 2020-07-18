const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const employee = require('./route/employee')
const employeeDetail = require('./route/empDetail')
const sssLoan = require('./route/sssLoan')
const cashAdvance = require('./route/cashAdvance')
const dtr = require('./route/dtr')
const payroll = require('./route/payroll')
const department = require('./route/department')
const teamLeader = require('./route/teamLeader')
const position = require('./route/position')

app.use(express.json())
app.use(cors())

app.use('/api/employee',employee)
app.use('/api/employeeDetail',employeeDetail)
app.use('/api/sssLoan',sssLoan)
app.use('/api/cashAdvance',cashAdvance)
app.use('/api/dtr',dtr)
app.use('/api/payroll',payroll)
app.use('/api/department',department)
app.use('/api/teamLeader',teamLeader)
app.use('/api/position',position)

//-- Handle Production --//
if(process.env.NODE_ENV === 'production'){
    //-- Static folder --//
    app.use(express.static(__dirname + '/public/'))

    //-- Handle SPA --//
    app.get(/.*/,(req,res)=>res.sendFile(__dirname + '/public/index.html'))
}

try {
    mongoose.connect(process.env.DB_CON,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
        console.log('Database Connected!'))   
} catch (error) {
    console.log(error)
}

app.listen(process.env.DB_PORT,()=>console.log(`Server started at port no. ${process.env.DB_PORT}`))