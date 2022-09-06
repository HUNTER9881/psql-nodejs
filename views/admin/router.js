const express = require('express');
const router = express.Router();

router.get('/houses', async (req, res, next) => {
    res.render(
        "./admin/pages/houses.ejs",
        { layout: "./admin/layout.ejs", title: "Admin" }
    )
})

router.get('/users', async (req, res, next) => {
    res.render(
        "./admin/pages/users.ejs",
        { layout: "./admin/layout.ejs", title: "Admin" }
    )
})
module.exports = router