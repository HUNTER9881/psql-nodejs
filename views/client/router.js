const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.render(
        "./client/pages/houses.ejs",
        { layout: "./client/layout.ejs", title: "Demo" }
    )
})
router.get('/:id', async (req, res, next) => {
    res.render(
        "./client/pages/details.ejs",
        { layout: "./client/layout.ejs", title: "Demo" }
    )
})

module.exports = router