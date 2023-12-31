const jwt = require('jsonwebtoken')
const User = require('../models/modelUser')

const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({message: "Auth req"})
    }

    const token = authorization.split(' ')[1]
    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({id}).select('username id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "request error"})
    }

}

module.exports = requireAuth