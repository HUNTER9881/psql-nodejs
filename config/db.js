const Pool = require('pg').Pool;
const poll = new Pool({
    user: "dilshod",
    password:  "1585743d",
    database: "ecom",
    host:  "localhost",
    port: 5432
})
module.exports = poll