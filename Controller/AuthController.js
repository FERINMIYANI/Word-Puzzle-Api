let Admin = require('../Model/Admin')
var jwt = require('jsonwebtoken');

exports.login = async function(req, res, next){
    try {
        let data = {...req.body}
        if(!data){
            throw new Error("No Data Found")
        }
        let details = await Admin.findOne({email: data.email})
        if(!details){
            throw new Error("Username Not Found")
        }
        if(details.password != data.password){
            throw new Error("Password Didn't Matched")
        }
        var token = jwt.sign({email: data.email}, 'shhhhh');
        return res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.addAdmin = async function(req, res, next){
    try {
        let data = {...req.body}
        if(!data){
            throw new Error("No Data Found")
        }
        let details = await Admin.create(data)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.protect = async function(req, res, next){
    try {
        let token = req.headers.auth
        if(!token){
            throw new Error("Token Not Found")
        }
        let verified = jwt.verify(token, 'shhhhh');
        if(!verified){
            throw new Error("Incorrect Token")
        }
        req.headers.id = verified._id
        next()
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}