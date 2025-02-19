import { z } from "zod";

const signupSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: "First name is too short" })
    .max(20, { message: "First name is too long" }),
  lastName: z
    .string()
    .min(5, { message: "Last name is too short" })
    .max(20, { message: "Last name is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(5, { message: "Address is too short" })
    .max(50, { message: "Address is too long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is too short" })
    .max(11, { message: "Phone number is too long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
};

export const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
};
