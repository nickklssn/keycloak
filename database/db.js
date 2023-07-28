const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres"
})

async function queryData(){
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM token;`)
    client.release()
    console.log("Das hier sollte das Resultat sein", result)
}

async function createTable(){
    const client = await pool.connect()
        await client.query(`CREATE TABLE IF NOT EXISTS token (
        "preferred_username" VARCHAR(100),
        "name" VARCHAR(100),
        "session_state" VARCHAR(100),
        "access_token" VARCHAR(5000),
        "refresh_token" VARCHAR(5000)

    );`)
    client.release()
}

async function insertData(data){
    await createTable()
    const client = await pool.connect()
    await client.query(`INSERT INTO token
    VALUES(
        '${data.preferred_username}',
        '${data.name}',
        '${data.session_state}',
        '${data.access_token}',
        '${data.refresh_token}'
    );`)
    client.release()
}

async function deleteData(){
    const client = await pool.connect()
    await client.query(`DROP TABLE token`)
    client.release()
}

async function updateData(data){
    //This function should update the access inside the cookie via
    //refresh token rotation
}






module.exports = {
    queryData,
    insertData,
    deleteData
}
