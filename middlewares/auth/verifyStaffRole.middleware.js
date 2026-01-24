const verifyStaffRole = async (req, res, next) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ 
            success: false,
            message: 'Access denied. Staffs only!'
        });
    }
    next();
};

export default verifyStaffRole;