const express = require('express');
const router = express.Router()
const controller = require('../controller/houses')

router.post('/create', controller.createData)
router.get('/all', controller.getAll)
router.get('/:id', controller.getOne)
router.put('/:id', controller.updateData)
router.delete('/:id', controller.deleteData)

module.exports = router;