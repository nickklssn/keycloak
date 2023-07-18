const {validateToken} = require("../../keycloak/client.js")

const verifyToken = async (req, res, next) => {
    try{
        const access_token = req.cookies.tokenset.access_token
        console.log(access_token)
        await validateToken(access_token)


        
        

    }

catch(err){
    console.error(err)
    res.send("Session expired, login again!")
}
}

module.exports = verifyToken