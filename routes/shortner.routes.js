const express = require('express');
const router = express.Router();

const shortner_controller = require('../controllers/shortner.controller');

router.post('/', shortner_controller.shortner_create);
router.get('/:shortnedUrl', shortner_controller.shortner_get);
// router.delete('/', shortner_controller.shortner_delete);

module.exports = router;
