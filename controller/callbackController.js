const { insertData, queryData } = require("../database/db.js")
const {getCallbackParams, generateTokenset} = require("../keycloak/client.js")

const callback = async (req, res, next) =>{
    try{
        const code_verifier = req.cookies.code_verifier
        //console.log(code_verifier)
        const params = await getCallbackParams(req)
        const tokenSet = await generateTokenset("http://localhost:3000/login/cb", params, {code_verifier})
        //console.log(params, tokenSet)
        await insertData(tokenSet)
        await queryData()
        res.cookie("tokenset", tokenSet.access_token, {httpOnly: true})
        res.clearCookie("code_verifier")
        res.send("Successfully authenticated")
        next()
    }
    catch(err){
        console.error(err.message)
    }
}

module.exports = callback