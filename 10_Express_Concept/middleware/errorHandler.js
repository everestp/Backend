

//custom error class
class APIError extends Error {
    constructor(message ,statusCode){
        super(message)
        this.statusCode = statusCode
        this.name = 'APIError'
    }
}

const asyncHandler = (fn)=>(req ,res, next)=>{
Promise.resolve(fn(req,res,next)).catch(next)
}
9
//global error handler
const globalErrorhandler = (err ,req,res,next)=>{
    console.log(err.stack)  //log the error stack

    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            status :'Error',
            message:err.message
        })
    }

    // handle mongoose validation
    else if(err.name ==='validationError'){
          return res.status(400).json({
            status :'Error',
            message:"Validation error"
        })
    }
    else {
          return res.status(500).json({
            status :'error',
            message:"An unexpected error occur"
        })
    }
}

module.exports = {APIError ,asyncHandler ,globalErrorhandler }