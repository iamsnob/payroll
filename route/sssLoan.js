const router = require('express-promise-router')()
const sssLoanController = require('../controller/sssLoan')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(sssLoanController.index)
    .post(sssLoanController.newLoan);

// router.route('/:id')
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router