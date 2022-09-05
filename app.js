const express = require('express');
const app = express()


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/houses", require('./router/houses'))
app.use("/api/users", require('./router/users'))



const server = app.listen(5000, () => {
    console.log("Server is running on", server.address().port)
})