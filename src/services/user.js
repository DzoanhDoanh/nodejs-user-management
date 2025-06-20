import db from '../models';

export const getUserByUserId = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password', 'role_code'],
                },
                include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] }],
            });
            resolve({
                err: response ? 0 : 1,
                message: response ? 'Got' : 'User not found',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
