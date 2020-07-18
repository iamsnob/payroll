const dtrModel = require('../model/dtr')
const cashAdvanceModel = require('../model/cashAdvance')
const sssLoanModel = require('../model/sssLoan')
const empDetailsModel = require('../model/empDetails')
const payrollModel = require('../model/payroll')

module.exports = {
    index:async(req,res,next)=>{
        const response = await dtrModel.find().populate('empD_id'); 
        if(!response) return res.status(400).json('No data foound');

        return res.status(200).json(response);
    },
    newDtr:async(req,res,next)=>{
        // --- Note: Hindi pa tapos, need to check if date dtr is already created, if so cannot create a new dtr ---//
    
        try {
            const { empD_id,
                    no_of_days,
                    reg_holiday,
                    spc_holiday,
                    ot,
                    late
                    } = req.body

            //--- getting cash Advance ---//
            const cashAdvanceResponce = await cashAdvanceModel.find({empD_id:empD_id})
            let cashAdvance = 0
            let cashAdvanceId
            let cashAdvanceBalance
            if(cashAdvanceResponce.length){
                cashAdvanceResponce.forEach(element =>{
                    if(element.status == 'On going payment'){
                        if(element.balance > 0){
                            cashAdvanceBalance = (element.balance - element.deduction)
                            cashAdvance = element.deduction
                            cashAdvanceId = element.id
                        }
                    }
                })
            }

            //-- getting SSS Loan ---//
            const sssLoanResponce = await sssLoanModel.find({empD_id:empD_id})
            let sssLoan = 0
            let sssLoanId
            let sssMonths
            let sssPayableMonths
            if(sssLoanResponce.length){
                sssLoanResponce.forEach(element =>{
                    if(element.status == 'On going payment'){
                        if(element.payable_months > element.months){
                            sssLoan = (element.amortization / 2)
                            sssLoanId = element.id
                            sssMonths =  element.months + 1
                            sssPayableMonths = element.payable_months
                        }   
                    }
                })
            }


            //--- Getting Employee Details ---//
            const EmpDetailsResponce = await empDetailsModel.findById(empD_id)

            //--- Late Computation ---//
            //--- Note: late is counted as Minutes ---//
            const lates = ((EmpDetailsResponce.daily_rate / 8) / 60) * late

            //--- Overtime Computation with additional 20% on regular daily rate ---//
            const overtime = ((EmpDetailsResponce.daily_rate / 8) + ((EmpDetailsResponce.daily_rate / 8) * .2)) * ot

            //--- Regular Holiday Computation ---//
            const regHoliday = EmpDetailsResponce.daily_rate * reg_holiday

            //--- Special Holiday Computation ---//
            const spcHoliday =  (EmpDetailsResponce.daily_rate * .3) * spc_holiday

            //--- Basic Rate Computation ---//
            const basicRate =  EmpDetailsResponce.daily_rate * no_of_days

            //--- Gross Income Computation ---//
            const grossIncome = basicRate + regHoliday + spcHoliday + overtime

            //--- Total Deductions Computations ---//
            const totalDeductions = EmpDetailsResponce.deductions.sss + EmpDetailsResponce.deductions.philhealth + EmpDetailsResponce.deductions.hdmf + EmpDetailsResponce.deductions.tax + lates + cashAdvance + sssLoan

            //--- Net pay Computation ---//
            const netPay = grossIncome - totalDeductions

            //--- saving on DTR database ---//
            const dtr = new dtrModel(req.body)
            const dtrResponce = await dtr.save()

            if(dtrResponce){
                const payroll = new payrollModel({
                    dtr:dtrResponce,
                    sssLoan:sssLoan.toFixed(2),
                    cashAdvance:cashAdvance.toFixed(2),
                    late:lates.toFixed(2),
                    overTime:overtime.toFixed(2),
                    regHoliday:regHoliday.toFixed(2),
                    spcHoliday:spcHoliday.toFixed(2),
                    basicRate:basicRate.toFixed(2),
                    grossIncome:grossIncome.toFixed(2),
                    totalDeductions:totalDeductions.toFixed(2),
                    netPay:netPay.toFixed(2)
                })
                const payrollResponce = await payroll.save()
                if(payrollResponce){
                    if(sssMonths < sssPayableMonths){
                        const query = {_id:sssLoanId}
                        let updateSssLoan = await sssLoanModel.findOneAndUpdate(query,{$set:{"months":sssMonths}},{new:true})
                    }
                        
                    if(sssMonths == sssPayableMonths){
                        const query = {_id:sssLoanId}
                        let updateSssLoan = await sssLoanModel.findOneAndUpdate(query,{$set:{"months":sssMonths,"status":"paid"}},{new:true})
                    }
                    if(cashAdvanceBalance > 0){
                        let query = {_id:cashAdvanceId}
                        let updateCashAdvane = await cashAdvanceModel.findOneAndUpdate(query,{$set:{
                            "balance":cashAdvanceBalance}},{new:true})
                    }
                    if(cashAdvanceBalance == 0){
                        let query = {_id:cashAdvanceId}
                        let updateCashAdvane = await cashAdvanceModel.findOneAndUpdate(query,{$set:{
                            "balance":cashAdvanceBalance,"status":"paid"}},{new:true})
                    }
                    return res.status(200).json(dtrResponce)
                }
                
            }
        } catch (error) {
            return res.status(400).json(error)
        } 
    },
    updateDtr:async(res,req,next)=>{
        try {
            const { empD_id,
                no_of_days,
                reg_holiday,
                spc_holiday,
                ot,
                late,
                dtr_id
                } = req.body

            //--- getting cash Advance ---//
            const cashAdvanceResponce = await cashAdvanceModel.find({empD_id:empD_id})
            let cashAdvance = 0
            let cashAdvanceId
            let cashAdvanceBalance
            if(cashAdvanceResponce.length){
                cashAdvanceResponce.forEach(element =>{
                    if(element.status == 'On going payment'){
                        if(element.balance > 0){
                            cashAdvanceBalance =  element.balance - element.deduction
                            cashAdvance = element.deduction
                            cashAdvanceId = element.id
                        }
                    }
                })
            }

             //-- getting SSS Loan ---//
             const sssLoanResponce = await sssLoanModel.find({empD_id:empD_id})
             let sssLoan = 0
             let sssLoanId
             let sssMonths
             let sssPayableMonths
             if(sssLoanResponce.length){
                 sssLoanResponce.forEach(element =>{
                     if(element.status == 'On going payment'){
                         if(element.payable_months > element.months){
                             sssLoan = (element.amortization / 2)
                             sssLoanId = element.id
                             sssMonths =  element.months + 1
                             sssPayableMonths = element.payable_months
                         }   
                     }
                 })
             }
 
 
             //--- Getting Employee Details ---//
             const EmpDetailsResponce = await empDetailsModel.findById(empD_id)
 
             //--- Late Computation ---//
             //--- Note: late is counted as Minutes ---//
             const lates = ((EmpDetailsResponce.daily_rate / 8) / 60) * late
 
             //--- Overtime Computation with additional 20% on regular daily rate ---//
             const overtime = ((EmpDetailsResponce.daily_rate / 8) + ((EmpDetailsResponce.daily_rate / 8) * .2)) * ot
 
             //--- Regular Holiday Computation ---//
             const regHoliday = EmpDetailsResponce.daily_rate * reg_holiday
 
             //--- Special Holiday Computation ---//
             const spcHoliday =  (EmpDetailsResponce.daily_rate * .3) * spc_holiday
 
             //--- Basic Rate Computation ---//
             const basicRate =  EmpDetailsResponce.daily_rate * no_of_days
 
             //--- Gross Income Computation ---//
             const grossIncome = basicRate + regHoliday + spcHoliday + overtime
 
             //--- Total Deductions Computations ---//
             const totalDeductions = EmpDetailsResponce.deductions.sss + EmpDetailsResponce.deductions.philhealth + EmpDetailsResponce.deductions.hdmf + EmpDetailsResponce.deductions.tax + lates + cashAdvance + sssLoan
 
             //--- Net pay Computation ---//
             const netPay = grossIncome - totalDeductions

             //--- updating DTR database ---//

            const dtrQuery = {id:dtr_id}
            const dtrResponce = await dtrModel.findOneAndUpdate(query,{$set:{
                "no_of_days":no_of_days,
                "reg_holiday":reg_holiday,
                "spc_holiday":spc_holiday,
                "ot":ot,
                "late":late
            }},{new:true})

            if(dtrResponce){
                const payroll = new payrollModel({
                    dtr:dtrResponce,
                    sssLoan:sssLoan,
                    cashAdvance:cashAdvance,
                    late:lates,
                    overTime:overtime,
                    regHoliday:regHoliday,
                    spcHoliday:spcHoliday,
                    basicRate:basicRate,
                    grossIncome:grossIncome,
                    totalDeductions:totalDeductions,
                    netPay:netPay
                })

                const payrollResponce = await payrollModel.findOneAndUpdate(dtrQuery,{
                    $set:{
                        "dtr":dtrResponce,
                        "sssLoan":sssLoan,
                        "cashAdvance":cashAdvance,
                        "late":lates,
                        "overTime":overtime,
                        "regHoliday":regHoliday,
                        "spcHoliday":spcHoliday,
                        "basicRate":basicRate,
                        "grossIncome":grossIncome,
                        "totalDeductions":totalDeductions,
                        "netPay":netPay
                    }
                },
                {new:true})
                if(payrollResponce){
                    return res.status(200).json({
                        dtr:dtrResponce,
                        payroll:payrollResponce
                    })
                }
                
            }

        } catch (error) {
            return res.status(400).json(error)
        }
    }
} 