import Models from "../database/models";
import bcrypt from "bcrypt";
import { decode, encode } from "../helpers/jwtTokenizer";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import coder from "../helpers/coder";
import dotenv from "dotenv";
dotenv.config();

const { users } = Models;
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox518fbe58df344e2aaea9e7a79460f29b.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const { Op, where, cast, col } = Sequelize;
class authController {
  static async addEmployee(req, res) {
    const { Name, NationalId, PhoneNumber, email, DoB, Position } = req.body;

    try {
      if (req.user) {
        return res.status(400).json({
          status: 400,
          message: "User with email already exist",
        });
      }
      const code = await coder();
      //const salt = await bcrypt.genSaltSync(10);
      // const hashPassword = await bcrypt.hashSync(password, salt);
      let newUser = await users.create({
        Name,
        NationalId,
        PhoneNumber,
        email,
        DoB,
        code,
        Status: "INACTIVE",
        Position,
        password: code,
      });

      const token = await encode({ email });
      const data = {
        from: "Noreply@hello.com",
        to: email,
        subject: "Account Activation",
        text: "Hello",
        html: `
                <h2>Please click on given link to activate your account</h2>
                <p>email: ${email} <br/> password: ${code} <br/> Activate your account <a href='${process.env.CLIENT_URL}/authentication/activate/${token}'>Activate</a></p>
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
        message: "Employee created successfully!",
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
        message: "all Employee ",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async activateAccount(req, res) {
    const { token } = req.body;
    if (token) {
      const {
        Name,
        NationalId,
        PhoneNumber,
        email,
        DoB,
        Status,
        Position,
        password,
      } = await decode(token);

      return res.status(200).json({
        status: 200,
        message: "actived account",
      });
    } else {
      return res.json({ error: "Something went wrong!!!" });
    }
  }

  static async search(req, res) {
    try {
      const { searchKey } = req.query;

      //   o	A manager should be able to search for an employee based on his position, name, email, phone number or code.
      const searchQuery = [
        where(cast(col("users.Position"), "varchar"), {
          [Op.like]: `%${searchKey}%`,
        }),
        where(cast(col("users.Name"), "varchar"), {
          [Op.like]: `%${searchKey}%`,
        }),
        where(cast(col("users.email"), "varchar"), {
          [Op.like]: `%${searchKey}%`,
        }),
        where(cast(col("users.PhoneNumber"), "varchar"), {
          [Op.like]: `%${searchKey}%`,
        }),
        where(cast(col("users.code"), "varchar"), {
          [Op.like]: `%${searchKey}%`,
        }),
      ];

      const found = await users.findAll({
        where: { [Op.or]: searchQuery },
      });

      return res.status(200).json({
        status: 200,
        found,
        message: "Search Complete",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const modelId = req.params.id;
      const found = await users.findOne({
        where: { id: modelId },
      });
      if (found) {
        const deleteUser = await users.destroy({
          where: { id: modelId },
        });
        return res.status(200).json({
          status: 200,
          message: "Employee deleted ",
        });
      }
      return res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "server error" + error.message });
    }
  }

  //editemployee
  static async updatedEmployee(req, res) {
    try {
      const { Name, NationalId, PhoneNumber, email, DoB, Position, Status } =
        req.body;
      const { id } = req.params;
      const found = await users.findOne({
        where: { id },
      });
      if (found) {
        const updatedEmployee = await users.update(
          {
            Name,
            NationalId,
            PhoneNumber,
            email,
            DoB,
            Status,
            Position,
          },
          { where: { id }, returning: true }
        );

        return res.status(200).json({
          status: 200,
          message: "Employee updated",
          data: updatedEmployee,
        });
      }

      res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "server error" });
    }
  }
  static async suspend(req, res) {
    try {
      const { id } = req.params;
      const found = await users.findOne({
        where: { id },
      });
      if (found) {
        const suspendUser = await users.update(
          {
            Status: "INACTIVE",
          },
          { where: { id }, returning: true }
        );
        res.status(200).json({
          status: 200,
          message: "Employee suspended",
        });
      }
      res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "server error" + error.message });
    }
  }
  static async activate (req, res) {
    try {
      const { id } = req.params;
      const found = await users.findOne({
        where: { id },
      });
      if (found) {
        const suspendUser = await users.update(
          {
            Status: "ACTIVE",
          },
          { where: { id }, returning: true }
        );
        res.status(200).json({
          status: 200,
          message: "Employee suspended",
        });
      }
      res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "server error" + error.message });
    }
  }
}

export default authController;
