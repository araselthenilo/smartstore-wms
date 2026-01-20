import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string()
            .alphanum()
            .min(3)
            .max(50)
            .required()
            .messages({
                "string.alphanum": "Username must only contain alpha-numeric characters"
            }),
    
    name: Joi.string()
        .min(3)
        .max(150)
        .required()
        .messages({
            "string.empty": "Name cannot be empty"
        }),
    
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(255)
        .required(),

    role: Joi.string()
        .required()
});

export default userSchema;