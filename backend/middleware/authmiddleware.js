const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req,res,next) =>{
    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message:'INVALID TOKEN NO OR MORE'})
    }
    const token = authHeader.split(" ")[1]
    try {
        req.user = jwt.verify(token,JWT_SECRET)
        next()
    } catch (error) {
        console.error('INVALID TOKEN NO OR MORE',error)
        res.status(403).json({message:'INVALID TOKEN NO OR MORE'})
    }
}

exports.requireRole = (role)=>(req,res,next)=>{
    try {
        if(req.user && req.user.role === role){
            return next()
        }
        res.status(403).json({message:'INVALID ROLE NO OR MORE'})
    } catch (error) {
        console.error('INVALID ROLE NO OR MORE',error)
        res.status(403).json({message:'INVALID ROLE NO OR MORE'})
    }
}