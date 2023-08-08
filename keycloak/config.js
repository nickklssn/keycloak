const issuerUrl = "http://localhost:8080/realms/myrealm"

const client1Config = {
    client_id: "myclient",
    client_secret: "xD0VuRQnZnGu0eDyGXEjn8yx52IbdO0A",
    redirect_uris: ["http://localhost:4000/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  };
  
  const client2Config = {
    client_id: "secondClient",
    client_secret: "B2W9YPVZdASuND8Xiw2d8ff4AyUnezIu",
    redirect_uris: ["http://localhost:4001/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  };


module.exports = {
    client1Config,
    client2Config,
    issuerUrl
}