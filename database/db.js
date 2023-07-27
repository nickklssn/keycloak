const { Client, Pool } = require("pg")
const client = new Client();


const postgres = `postgresql://postgres:postgres@localhost:5432/postgres`;

const pool = new Pool({
    connectionString: postgres
})

async function queryDb(){
    return await pool.query('SELECT NOW() as now')
}



module.exports = {
    queryDb
}
