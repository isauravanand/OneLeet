const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const verifyToken = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, Please Login First' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');

        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
};

module.exports={
    verifyToken,
}
