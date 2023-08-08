const client2Config = {
    client_id: "secondClient",
    client_secret: "B2W9YPVZdASuND8Xiw2d8ff4AyUnezIu",
    redirect_uris: ["http://localhost:4001/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  };


  module.exports = {
    client2Config
}