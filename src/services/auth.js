import bcrypt from 'bcryptjs';
import db from '../models';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
};
export const register = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: hashPassword(password),
                },
            });
            const token = response[1]
                ? jwt.sign(
                      { id: response[0].id, email: response[0].email, role_code: response[0].role_code },
                      process.env.JWT_SECRET,
                      { expiresIn: '2d' },
                  )
                : null;
            resolve({
                err: response[1] ? 0 : 1,
                message: response[1] ? 'Register is successfully' : 'Email is used',
                accessToken: `Bearer ${token}`,
            });
        } catch (error) {
            reject(error);
        }
    });
export const login = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { email },
                raw: true,
            });
            const isChecked = response && bcrypt.compareSync(password, response.password);
            const token = isChecked
                ? jwt.sign(
                      { id: response.id, email: response.email, role_code: response.role_code },
                      process.env.JWT_SECRET,
                      { expiresIn: '2d' },
                  )
                : null;
            resolve({
                err: token ? 0 : 1,
                message: token ? 'Login is successfully' : response ? 'Password was wrong' : 'Email not registered',
                accessToken: token ? `Bearer ${token}` : token,
            });
        } catch (error) {
            reject(error);
        }
    });
