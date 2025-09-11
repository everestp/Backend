


const isAdminUser = (req ,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success:false,
            message:"Access denied ! admin right required"
        })
    }
    next()
}


module.exports = isAdminUser