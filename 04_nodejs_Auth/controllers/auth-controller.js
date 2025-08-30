const User = require('../models/User')
const bcrypt = require('bcryptjs')
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
      






        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}


module.exports = {registerUser ,loginUser}