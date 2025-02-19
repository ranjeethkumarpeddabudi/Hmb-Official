import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { welcomeMail } from "../middlewares/mailer.js";
export const Signup = async (req, res) => {
  const { firstName, lastName, email, password, address, phoneNumber } =
    req.body;

  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      address,
      phoneNumber,
    });
    if (newUser) {
      await newUser.save();
      welcomeMail(newUser);
      res.status(201).json({
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        phone_number: newUser.phoneNumber,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExits = await User.findOne({ email });
    if (!userExits) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      userExits.password
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign(
      { id: userExits._id, email: userExits.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ jwt: token });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
