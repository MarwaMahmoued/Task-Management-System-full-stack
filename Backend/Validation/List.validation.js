import Joi from "joi";
export const createListSchema = Joi.object({
  title: Joi.string().min(2).max(30).trim().required().messages({
      "string.empty": "List title is required",
      "string.min": "List title must be at least 2 characters",
      "any.required": "List title is a required field"
    }),

  boardId: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid Board ID format",
      "string.length": "Board ID must be 24 characters long",
      "any.required": "Board ID is required to link the list"
    })
});                                                                     
export const updateListSchema = Joi.object({
  title: Joi.string().min(2).max(30).trim()
}).min(1);