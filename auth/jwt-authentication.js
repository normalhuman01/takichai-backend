const jwt = require('jsonwebtoken');
const UsersService = require('../users/users.service');

const authUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader)
        return res.status(400).json({
            ok: false,
            msg: "Token not found"
        });
    
    if(!authHeader.startsWith("Bearer ", 0))
        return res.status(400).json({
            ok: false,
            msg: "Bad authorization"
        });
    
    const token = authHeader.substring(7, authHeader.length);

    try {
        const { id } = jwt.verify(token, process.env.KEY);
        const user = await UsersService.getOne(id);
        if(!user)
            return res.status(403).json({
                ok: false,
                msg: "Invalid token: user not found"
            });
        req.user = user;
        next();
    } catch(error) {
        console.error(`Error: ${error.message}`);
            return res.status(500).json({
                ok: false,
                msg: "User login failed!",
                detail: error.message
            });
    }
}

module.exports = {
    authUser
}