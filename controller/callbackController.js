const {getCallbackParams, generateTokenset, generateCodeChallenge} = require("../keycloak/client.js")

const callback = async (req, res, next) =>{
    try{
        const code_verifier = req.cookies.code_verifier
        console.log(code_verifier)
        const params = await getCallbackParams(req)
        const tokenSet = await generateTokenset("http://localhost:3000/login/cb", params, {code_verifier})
        console.log(params)
        res.send("Successfully authenticated")
    }
    catch(err){
        console.error(err.message)
    }
}

module.exports = callback