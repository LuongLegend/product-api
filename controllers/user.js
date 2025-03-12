import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { user } from '../models/index.js';
import { returnError, returnSuccess } from './config.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '12';

function createToken(data) {
    const token = jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    return token;
}

const registerUser = async (data) => {
    const { username, email, password } = data;
    if (!username || !email || !password || password.length < 6) throw new Error('missing input');
    //validation
    try {
        data.passwordHash = password;
        const item = user.build(data);
        await item.validate();
    } catch (err) {
        throw new Error(err.message);
    }
    try {
        const findUserByUsername = await user.findOne({
            where: {
                username,
            },
        });
        if (findUserByUsername)
            return {
                status: 0,
                msg: 'username is being used',
            };
        const findUserByEmail = await user.findOne({
            where: {
                email,
            },
        });
        if (findUserByEmail)
            return {
                status: 0,
                msg: 'email is being used',
            };
        await user.create(data, { fields: ['username', 'email', 'passwordHash'] });
    } catch (err) {
        throw new Error(err.message);
    }
};

const loginUser = async (data) => {
    const { username, password: loginPassword } = data;
    if (!username || !loginPassword || username.length < 6 || loginPassword.length < 6)
        return returnError(400, 'Invalid input');

    const findUser = await user.findOne({
        where: {
            username,
        },
    });
    if (!findUser) {
        return returnError(400, 'User is not found');
    }
    const { id, passwordHash } = findUser.dataValues;
    console.log(findUser.dataValues);
    const isValidPass = bcrypt.compareSync(loginPassword, passwordHash);
    if (!isValidPass) {
        return returnError(400, 'Password is not match');
    }
    const token = createToken({ userId: id, username });
    return returnSuccess({ token });
};

export { registerUser, loginUser };
