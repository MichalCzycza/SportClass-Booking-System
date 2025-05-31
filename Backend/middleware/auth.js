const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        console.log("No token provided");
        return res.status(401).send({
            ok: false,
            error: "No token provided."
        });
    }

    try {
        console.log("Token received:", token);
        const decoded = jwt.verify(token, "123456");
        console.log("Decoded token:", decoded);
        req.user = decoded;
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).send({
            ok: false,
            err: "Token expired or invalid"
        });
    }

    next();
};
