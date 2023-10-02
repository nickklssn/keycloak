const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

async function queryData() {
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

async function createTable() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS token (
        "session_state" VARCHAR(100),
        "access_token" VARCHAR(5000),
        "refresh_token" VARCHAR(5000)

    );`);
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

async function insertData(data) {
  let client;
  try {
    await createTable();
    client = await pool.connect();
    await client.query(`INSERT INTO token
    VALUES(
        '${data.session_state}',
        '${data.access_token}',
        '${data.refresh_token}'
    );`);
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

async function deleteData() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`DELETE FROM token`);

    console.log("Deleted all token");
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

async function deleteToken(token) {
  let client;
  try {
    client = await pool.connect();
    await client.query(
      `DELETE FROM token
    WHERE access_token = $1;`,
      [token]
    );

    console.log("Token deleted!");
  } catch (err) {
    console.error(err.message)
  } finally {
    client.release();
  }
}

async function getRefreshtoken(data) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT refresh_token FROM token
            WHERE access_token = $1;`,
      [data]
    );
    if (result.rows.length > 0) {
      const refresh_token = result.rows[0].refresh_token;
      console.log(refresh_token);
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
  queryData,
  insertData,
  deleteData,
  getRefreshtoken,
  updateToken,
  deleteToken,
};
