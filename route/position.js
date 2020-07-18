const router = require('express-promise-router')()
const positionController = require('../controller/position')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(positionController.index)
    .post(positionController.newPosition)
    .put(positionController.updatePosition)

// router.route('/:id')
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router
 