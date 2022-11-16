const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const jwttoken = req.headers.authorization.split(' ');
            jwt.verify(jwttoken[1], config.SECRET, (err, verify) => {
                if(!err){
                    req.decoded_data = verify.authUser;
                    next();
                } else{
                    return res.status(400).json({ status: 400, message: "Invalid token", error: err });
                }
            });
        } else{
            return res.status(401).json({ status: 401, message: "Unauthorized", error: true, });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Somthing went wrong.", error: error, });
    }

}