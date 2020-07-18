const router = require('express-promise-router')()
const departmentController = require('../controller/department')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(departmentController.index)
    .post(departmentController.newDepartment)
    .put(departmentController.updateDepartment)

// router.route('/:id')
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router
 