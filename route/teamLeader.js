const router = require('express-promise-router')()
const teamLeaderController = require('../controller/teamLeader')
//const {empInfoValidation} = require('../validate/validate');
//const verify = require('../tokenverify');

router.route('/')
    .get(teamLeaderController.index)
    .post(teamLeaderController.newTeamleader)
    .put(teamLeaderController.updateTeamLeader)

// router.route('/:id')
//     .get(EmpController.getEmployee)
//     .put(EmpController.updateEmployee)
//     .delete(EmpController.deleteEmployee);

module.exports = router
 