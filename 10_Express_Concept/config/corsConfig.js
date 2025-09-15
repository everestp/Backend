

const cors = require("cors")

const configureCors = ()=>{
    return cors({
        // orgin -> this will tell tjhat which origin you want  users can access you api
        origin:(origin ,callback)=>{
            const allowedOrigin = [
                'http://localhost:3000'  // local dev
            ]
            if(!origin  || allowedOrigin.indexOf(origin) !== -1){
                callback(null ,true)   // giving permission so that req can be allowed
            } else {
                callback(new Error('Not allwed by cors'))
            }
        },
        methods:['GET' ,'POST','PUT','DELETE'],
        allowedHeaders :[
            'Content-Type',
            'Authorization',
 
        ],
        exposedHeaders :['X-Total-Count','Content-Range'],
        credentials :true, // enable support for cookies     this is very very important
         preflightContinue: false,
         maxAge:600, // cache pre flight responses for 10 minute (600 sec)-> avoid sending option request multiple times
         optionsSuccessStatus :204

    })
}

module.exports = configureCors