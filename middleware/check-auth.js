const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    try {
        
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "saamslarrien")
        req.userData = decoded
        next()
    } catch (error) {
        console.log({error: error.message})
        return res.send(error.message)
    }
}