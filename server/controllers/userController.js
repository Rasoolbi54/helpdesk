const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')




exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    
    if (!email || !password || !name || !role) {
      return res.status(422).json({ message: "Invalid data" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashPW = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      email,
      password: hashPW, 
      name,
      role,
    });

    
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




exports.login = async (req,res) => {
    const {email , password} = req.body;
    try {

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({message:"email doesn't exist"});
        };


     const isMatch = await bcrypt.compare(password , existingUser.password);

     if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
     }


     const token = jwt.sign({id:existingUser._id , role:existingUser.role} , process.env.JWT_SECRET_KEY , {expiresIn:'2h'});

     res.status(200).json({ token , user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      },})
        
    } catch (error) {
        return res.status(500).json({message:"something went wrong"});
    }
}
