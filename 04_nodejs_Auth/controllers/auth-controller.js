

// register Controller

const registerUser = async(req ,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}

//login Controller
const loginUser = async(req ,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}


module.exports = {registerUser ,loginUser}