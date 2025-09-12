const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================
// Register Controller
// ============================
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with the given username or email! Please try a different one.',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // ✅ Correct field
            role: role || 'user'
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.',
        });
    }
};

// ============================
// Login Controller
// ============================
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist",
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15m' }
        );

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.',
        });
    }
};



const changePassword = async(req ,res)=>{
    try {
        const userId = req.userInfo.userId
        // extract old and new Password
        const {oldPassword ,newPassword}= req.body

        //find the 
        const user = await  User.findById(userId)
        if(!user){
            return res.status(400).json({
               success:false,
               message:"User not found"
            })
        }
        //check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword ,user.password)

        if(!isPasswordMatch){
            res.status(400).json({
                success:true,
                message:"Old password did not match"
            })
        }

        //hash the new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword ,salt)
        

        // update  user password and save to database
   user.password = newHashedPassword;
    await user.save()
      
        res.status(200).json({
            success:true,
            message:"Password Change succesfully"
        })



    } catch (error) {
        console.error(error);
         res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.',
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword
};
