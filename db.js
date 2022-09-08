const pg = require('pg');
// const conString = "postgres://postgres:12345@localhost:5432/employer";
const conString = 'postgres://admin:Passw0rd@192.168.205.10:5432/postgres?sslmode=disable';
const client = new pg.Client(conString);
module.exports = client.connect().then(() => {
    console.log("PostgreSQL is connected")
}).catch((error) => {
    console.log(error.message)
})