const { getAuthUrl } = require("../../keycloak/client")



const authentication = async (req, res, err, next) =>{
    try{
    if(err){
        console.log("mfkfnmjkfnefkjnefjkenbf")
        res.redirect(await getAuthUrl());
    }
}
catch(err){
    console.error(err.message)
    console.log("Warum gehr das nicht")
}
    
}



module.exports = authentication