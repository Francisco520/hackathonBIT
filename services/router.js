const express = require('express');
const router = new express.Router();
const clients = require('../controllers/clients.js');

router.route('/clients/:id?/:usuario?/:auth?')
    .get(clients.get);

module.exports = router;