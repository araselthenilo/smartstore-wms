import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string()
        .required(),
    name: Joi.string()
        .required(),
    email: Joi.email()
        .required(),
    password: Joi.string()
        .required(),
    role: Joi.string()
        .required()
});

export default userSchema;