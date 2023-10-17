const userModels = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const router = require("../routers/authRoute");
const userModel = require("../models/userModel");
const validator = require("validator");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

//send mail to the user
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brooklyn.larkin@ethereal.email",
    pass: "6y5uKvpJA2Cr7KncmN",
  },
});
//this function calls for register users
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, answer, photo } =
      req.body;
    //check validations
    console.log(name, email, password, phone, address, role, answer, photo);
    if (!name | !email || !password || !phone || !address || !role || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please enter all required fields",
      });
    }

    //check user
    const existinguser = await userModels.find({ email: email });
    //check existing user
    if (existinguser.email) {
      return res.status(200).send({
        success: true,
        message: "user is already exists",
      });
    }
    //changed password into hashed password
    console.log(password);
    const hashedPassword = await hashPassword(password);
    console.log(hashPassword);
    //store all details in the database
    const user = await userModels.create({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      role: role,
      phone: phone,
      answer: answer,
      photo: photo,
    });
    console.log(user);
    //send successmessage to the user register emails.
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"sandeep " <sandeep@zwphymart.com>', // sender address
      to: `${email},sandeepkg8756@gmail.com`, // list of receivers
      subject: "zephymart", // Subject line
      text: "Successfully resgister", // plain text body
      html: "<b>Welcome to zephymart</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    res.status(200).send({
      success: true,
      message: "successfully created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//login user with email and password
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
        error,
      });
    }

    //find user in the database through the email.
    const user = await userModels.findOne({ email });
    //check user exists or not
    if (user) {
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = JWT.sign({ _id: user._id }, process.env.SECRETE_JWT, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "Login successfully completed",
        user: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
          photo: user.photo,
        },
        token,
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "Invalid email",
        error,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

//get all data
const getAllDataController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "find all data",
  });
};

//forgetpasswordscontroller
const forgetPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body;
  try {
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }

    const user = await userModels.findOne({ email, answer });
    if (user) {
      const hashedPassword = await hashPassword(newPassword);
      updatedUser = await userModels.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });
      res.status(200).send({
        success: true,
        message: "Pssword Reset Successfully",
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid email or answer",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update user details
const updateUserController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!password && password.length < 6) {
      return res.json({
        error: "Password is required and minimum 6 character",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).send({
      success: true,
      message: "Successfuly updatedUser",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
const useDetailsController = async (req, res) => {
  try {
    const details = await userModel.find({});
    if (details) {
      res.status(200).send({
        success: true,
        message: "Detail successfully fetched",
        details,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Detail not fetched",
        details,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something error are occur find details",
      error,
    });
  }
};
//user deleted
const deleteUserController = async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"successFully deleted",
            user,
        })
    }
    catch(error){
        res.status(200).send({
            success:false,
            message:"something went wrong for deletion",
            user,
        })

    }
}
module.exports = {
  useDetailsController,
  registerController,
  loginController,
  getAllDataController,
  forgetPasswordController,
  updateUserController,
  deleteUserController
};
