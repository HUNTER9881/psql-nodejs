const Pool = require('pg').Pool;
const poll = new Pool({
    user: "postgres",
    password:  "12345",
    database: "employer",
    host:  "127.0.0.1",
    port: "5432"
})
module.exports = poll