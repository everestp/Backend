
const rateLimit = require('express-rate-limit')

const createBasicRateLimit = (maxRequest ,time)=>{
    return rateLimit({
     max:maxRequest,
     windowMs:time,
     message:'Too many request ,Please try again later',
     stadardHeaders:true,
     legecyHeaders:false
    })
}

module.exports = {createBasicRateLimit}