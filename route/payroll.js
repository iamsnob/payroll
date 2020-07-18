const router = require('express-promise-router')();
const payrollController = require('../controller/payroll');
// const {empDetailValidation} = require('../validate/validate');
// const verify = require('../tokenverify');

router.route('/')
    .get(payrollController.index)
    // .post(empDetailController.newEmpDetail)

// router.route('/:id')
//     .put(empDetailController.updateEmpDetail)
//     .delete(empDetailController.deleteEmpDetails)

module.exports = router;     