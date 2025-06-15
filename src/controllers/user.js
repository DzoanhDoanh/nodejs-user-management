import * as services from '../services';
import { internalServerError, badRequest } from '../middlewares/hanle_error';

export const getCurrentUser = async (req, res) => {
    try {
        const {id} = req.user
        const response = await services.getUserByUserId(id);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
