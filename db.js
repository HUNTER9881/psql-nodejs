const pg = require('pg');
const conString = "postgres://postgres:12345@localhost:5432/employer";
const client = new pg.Client(conString);
module.exports = client.connect().then(() => {
    console.log("PostgreSQL is connected")
}).catch((error) => {
    console.log(error.message)
})