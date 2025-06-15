import { notAuth } from './hanle_error';

export const isAdmin = (req, res, next) => {
    const { role_code } = req.user;
    if (role_code !== 'R1') return notAuth('Require Admin', res);
    next();
};
export const isModerator = (req, res, next) => {
    const { role_code } = req.user;
    if (role_code !== 'R1' && role_code !== 'R2') return notAuth('Require Admin or Moderator', res);
    next();
};
