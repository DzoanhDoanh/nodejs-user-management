import * as services from '../services';
import { internalServerError, badRequest } from '../middlewares/hanle_error';
import { email, password } from '../helper/joi_schema';
import Joi from 'joi';

export const registerController = async (req, res) => {
    try {
        const { error } = Joi.object({ email, password }).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.register(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const loginController = async (req, res) => {
    try {
        const { error } = Joi.object({ email, password }).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.login(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
