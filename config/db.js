const Pool = require('pg').Pool;
const poll = new Pool({
    user: "dilshod",
    password:  "12345",
    database: "ecom",
    host:  "localhost",
    port: "5432"
})
module.exports = poll