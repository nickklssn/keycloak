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
    await client.query(`DELETE FROM token`)
    client.release()
    console.log("Deleted data!")
}

async function getRefreshtoken(data) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT refresh_token FROM token
            WHERE access_token = $1;`,
            [data]
        );

        // Überprüfen, ob Zeilen vorhanden sind
        if (result.rows.length > 0) {
            const refresh_token = result.rows[0].refresh_token;
            console.log(refresh_token);
            return refresh_token;
        } else {
            console.log("Kein Refresh-Token gefunden.");
            return null; // Oder wir können einen speziellen Wert zurückgeben, um anzuzeigen, dass kein Token gefunden wurde.
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Refresh-Tokens:", error);
        return null; // Oder wir können einen speziellen Wert zurückgeben, um den Fehler zu kennzeichnen.
    } finally {
        client.release();
    }
}

async function updateToken(oldAccessToken, newAccessToken, newRefreshToken) {
    const client = await pool.connect();
    await client.query(
        `UPDATE token
        SET access_token = $1,
            refresh_token = $2
        WHERE access_token = $3;
        `,
        [newAccessToken, newRefreshToken, oldAccessToken]
    );
    client.release();
}






module.exports = {
    queryData,
    insertData,
    deleteData,
    getRefreshtoken,
    updateToken
}
