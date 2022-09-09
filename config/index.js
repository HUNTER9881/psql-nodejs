const Pool = require('pg').Pool;
const poll = new Pool({
    user: "admin",
    password: "Passw0rd",
    database: "testdb",
    host: "127.0.0.1",
    port: 5432
})
module.exports = poll;