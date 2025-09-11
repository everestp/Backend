const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// register Controller

const registerUser = async(req ,res)=>{
    try {
          //extract user infomration from our request body
        const {username ,email ,password ,role} = req.body
        

        //check if the user is alteady exist in our database
        const checkExistingUser = await User.findOne({$or: [{username },{email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success:false,
                message:'User is already exist with given username or Email ! Please try with different username or email'

            })
        }
            //hash the password to stiore in database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            // create a newUser and store it in database
            const newlyCreateUser = new User({
                username,
                email,
                hashedPassword,
                role :role || 'user'
            })
            await newlyCreateUser.save()
            if(newlyCreateUser){
                res.status(201).json({
                    success:true,
                    message:"User registered Successfully"
                })

            


        }else{
              res.status(400).json({
                    success:false,
                    message:"User registeration Failed ! Please Try Again"
                })
        }


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
       const {username ,password}= req.body;
        
       //find is the current user is exist in database
       const  user = await User.findOne({username});
       if(!user){
        return res.status(400).json({
            success:false,
            message:"User  doesn't exists"
        })
       }
   //  check if user exist check the password is correct
   //if password is correct or not
   const isPasswordMatch = await bcrypt.compare(password ,user.password);

   if(!isPasswordMatch){
    return res.status(400).json({
            success:false,
            message:"Invalid  crendiantial"
        })
   }

//  create a user token
 const accessToken = jwt.sign({
    userId:user._id,
    username:user.username,
    role:user.role
 },process.env.JWT_SECRET_KEY,{
        expiresIn :'15m'
 })


 res.status(200).json({
    sucess:true,
    message:'Logged in Successfull',
    accessToken
 })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}


module.exports = {registerUser ,loginUser}