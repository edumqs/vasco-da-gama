const express = require('express');
const controller = require('../../controllers/auth.controller');

const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.route('/getme')
    .get(authorize, controller.getMe);

router.route('/register')
    .post(controller.register);

router.route('/login')
    .post(controller.login);

router.route('/refresh-token')
    .post(controller.refresh);

router.route('/logout')
    .post(controller.logout);

module.exports = router;
