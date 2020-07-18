const router = require('express-promise-router')()
const EmpController = require('../controller/employee')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(EmpController.index)
    .post(EmpController.newEmployee);

router.route('/:id')
    .get(EmpController.getEmployee)
    .put(EmpController.updateEmployee)
    .delete(EmpController.deleteEmployee);

module.exports = router
 