const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

//get all token sets from db
async function queryAllToken() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM token;`);
    return result;
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

//create db table for tokens
async function createTable() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS token (
        "session_state" VARCHAR(1000),
        "access_token" VARCHAR(5000),
        "refresh_token" VARCHAR(5000)

    );`);
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

//insert token set in db
async function insertToken(token) {
  let client;
  try {
    await createTable();
    client = await pool.connect();
    await client.query(`INSERT INTO token
    VALUES(
        '${token.session_state}',
        '${token.access_token}',
        '${token.refresh_token}'
    );`);
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

//delete token from db
async function deleteToken(accessToken) {
  let client;
  try {
    client = await pool.connect();
    await client.query(
      `DELETE FROM token
    WHERE access_token = $1;`,
      [accessToken]
    );

    console.log("Token deleted!");
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

// get refresh token from db
async function getRefreshtoken(accessToken) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT refresh_token FROM token
            WHERE access_token = $1;`,
      [accessToken]
    );
    if (result.rows.length > 0) {
      const refresh_token = result.rows[0].refresh_token;
      return refresh_token;
    } else {
      console.log("No refresh token found!");
      return null;
    }
  } catch (error) {
    console.error(err.message)
    return null;
  } finally {
    client.release();
  }
}

//update invalid access token
async function updateToken(oldAccessToken, newAccessToken, newRefreshToken) {
  let client;
  try {
    client = await pool.connect();
    await client.query(
      `UPDATE token
        SET access_token = $1,
            refresh_token = $2
        WHERE access_token = $3;
        `,
      [newAccessToken, newRefreshToken, oldAccessToken]
    );
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

module.exports = {
  queryAllToken,
  insertToken,
  getRefreshtoken,
  updateToken,
  deleteToken,
};
