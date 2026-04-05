import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3) .max(100).trim() .required().messages({
      "string.empty": "Task title is required",
      "string.min": "Task title should be at least 3 characters"
    }),

  description: Joi.string().max(500).trim().optional(),

  status: Joi.string().valid("To Do", "In Progress", "Done").default("To Do") .messages({
      "any.only": "Status must be one of: To Do, In Progress, Done"
    }),

  listId: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid List ID format"
  }),

  boardId: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid Board ID format"
  }),

  assignedTo: Joi.string().hex().length(24).optional(),

  deadline: Joi.date().greater('now').optional().messages({
      "date.greater": "Deadline must be a future date"
    })
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().max(500).trim(),
  status: Joi.string().valid("To Do", "In Progress", "Done"),
  listId: Joi.string().hex().length(24),
  assignedTo: Joi.string().hex().length(24),
  deadline: Joi.date().greater('now')
}).min(1);