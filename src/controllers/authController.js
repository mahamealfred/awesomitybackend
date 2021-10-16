import Models from "../database/models";
import bcrypt from "bcrypt";
import { decode, encode } from "../helpers/jwtTokenizer";
import jwt from "jsonwebtoken";
import coder from '../helpers/coder'
import dotenv from "dotenv";
dotenv.config();

const { users } = Models;
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox518fbe58df344e2aaea9e7a79460f29b.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

class authController {
  static async signup(req, res) {
    const { Name, NationalId, PhoneNumber, email, DoB, Position, password } =
      req.body;

    try {
      if (req.user) {
        return res.status(400).json({
          status: 400,
          message: "User with email already exist",
        });
      }
      const code = await coder()
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      let newUser = await users.create({
        Name,
        NationalId,
        PhoneNumber,
        email,
        DoB,
        code,
        Status: "INACTIVE",
        Position: "MANAGER",
        password: hashPassword,
      });

      const token = await encode({ email });
      const data = {
        from: "Noreply@hello.com",
        to: email,
        subject: "Account Activation",
        text: "Hello",
        html: `
                <h2>Please click on given link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/auth/email-activate/${token}</p>
                `,
      };

      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: "Email has been sent, kindly activate your Account.",
        });
      });

      return res.status(200).json({
        status: 200,
        data: newUser,
        message: "User created successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error" + error.message,
      });
    }
  }
  
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!req.user) {
        return res.status(404).json({
          status: 404,
          mesage: "User not found",
        });
      }
      const dbEmail = req.user.email;
      const dbPasword = req.user.password;

      const decreptedPassword = await bcrypt.compare(password, dbPasword);
      if (dbEmail == email) {
        if (decreptedPassword) {
          const token = await encode({ email });
          return res.status(200).json({
            status: 200,
            mesage: "User logged with Token",
            data: {
              user: req.user,
              token,
            },
          });
        }
      }
      return res.status(401).json({
        status: 401,
        message: "Password is not correct",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error" + error.message,
      });
    }
  }

  static async getAllUser(req, res) {
    try {
      const userData = await users.findAll();
      res.status(200).json({
        status: 200,
        message: "all users ",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async activateAccount(req, res) {
      try {
        const { token } = req.params;
        const { email } = await decode(token)

        // update status to active
        let updatedEmail = await users.update({Status:'ACTIVE'}, { where:{email}})

        return res.status(200).json({
            status: 200,
            datta: updatedEmail,
            message: "User activated successfully!",
          });

      } catch (error) {
        return res.status(500).json({
            status: 500,
            message:  error.message,
          });
        }
      }
    
  }

export default authController;
