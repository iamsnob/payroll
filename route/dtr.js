const router = require('express-promise-router')()
const dtrController = require('../controller/dtr')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(dtrController.index)
    .post(dtrController.newDtr)
    .put(dtrController.updateDtr)

// router.route('/:id')
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router