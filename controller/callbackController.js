const { insertData } = require("../database/db.js")
const {getCallbackParams, generateTokenset} = require("../keycloak/client.js")


const callback = async (req, res, next) =>{
    try{
        const code_verifier = req.cookies
        const params = getCallbackParams(req)
        const tokenSet = await generateTokenset(params, code_verifier)
        await insertData(tokenSet)
        res.cookie("tokenset", tokenSet.access_token, {httpOnly: true})
        res.clearCookie("code_verifier")
        next()
    }
    catch(err){
        console.error(err.message)
    }
}

module.exports = callback