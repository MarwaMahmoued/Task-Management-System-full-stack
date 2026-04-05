import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of 3",
    "string.max": "Name should have a maximum length of 20",
    "any.required": "Name is a required field"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is a required field"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should have a minimum length of 6",
    "any.required": "Password is a required field"
  }),
  age: Joi.number().min(18).max(90).messages({
    "number.min": "Age must be at least 18",
    "number.max": "Age cannot be older than 90"
  })
});

// 2. SignIn Schema
export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});