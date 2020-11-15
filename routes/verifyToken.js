const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token') || req.cookies.auth;
    // const token = req.headers.authorization.split('Bearer ')[1]
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        next();
    } catch (error) {
        return res.status(422).json({ message: 'Invalid Token' });
    }
}