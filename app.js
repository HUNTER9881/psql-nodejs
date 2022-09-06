const express = require('express');
const app = express()
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(expressEjsLayouts)


// Backend API
app.use("/api/houses", require('./router/houses'))
app.use("/api/users", require('./router/users'))

// Frontend API
app.use("/", require('./views/client/router')) // client side
app.use("/admin", require('./views/admin/router')) // admin side


const server = app.listen(5000, () => {
    console.log("Server is running on", server.address().port)
})