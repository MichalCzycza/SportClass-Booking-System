function checkRole(roles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.some(role => userRole.includes(role))) {
            return res.status(403).send('Not authorized');
        }
        next();
    };
}

module.exports = { checkRole };
