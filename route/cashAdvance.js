const router = require('express-promise-router')()
const cashAdvanceController = require('../controller/cashAdvance')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(cashAdvanceController.index)
    .post(cashAdvanceController.newCashAdvance);

 router.route('/:id')
 .get(cashAdvanceController.getCashAsdvance)
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router