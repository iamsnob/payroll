const router = require('express-promise-router')();
const empDetailController = require('../controller/empDetail');
// const {empDetailValidation} = require('../validate/validate');
// const verify = require('../tokenverify');

router.route('/')
    .get(empDetailController.index)
    .post(empDetailController.newEmpDetail)

router.route('/:id')
    .put(empDetailController.updateEmpDetail)
    .delete(empDetailController.deleteEmpDetails)

module.exports = router;     