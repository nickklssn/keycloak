const client1Config = {
    client_id: "myclient",
    client_secret: "xD0VuRQnZnGu0eDyGXEjn8yx52IbdO0A",
    redirect_uris: ["http://localhost:4000/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  };


module.exports = {
    client1Config
}