import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(50) .trim().required().messages({
      "string.empty": "Board title is required",
      "string.min": "Board title must be at least 3 characters",
      "any.required": "Board title is a required field"
    }),

  description: Joi.string().max(200) .trim().optional() .messages({
      "string.max": "Description cannot exceed 200 characters"
    })
});
export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(50).trim(),
  description: Joi.string().max(200).trim()
}).min(1); 