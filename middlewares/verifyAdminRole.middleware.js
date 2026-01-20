const verifyAdminRole = async (req, res, next) => {
    if (req.user.role !== 'administrator') {
        return res.status(403).json({ 
            success: false,
            message: 'Access denied. Administrators only!'
        });
    }
    next();
};

export default verifyAdminRole;