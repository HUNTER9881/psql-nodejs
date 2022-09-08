const Pool = require('pg').Pool;
const poll = new Pool({
    user: "postgres",
    password:  "12345",
    database: "employer",
    host:  "localhost",
    port: 5432
})
module.exports = poll