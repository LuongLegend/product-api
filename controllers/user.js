import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { user } from '../models/index.js';
import { returnError, returnSuccess } from '../utils/common.js';
import { changeAlias } from '../utils/common.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '12';

const createToken = (data) => {
    const token = jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    return token;
};

const getUniqueUsername = async (name) => {
    const aliasUsername = changeAlias(name, '_');
    while (true) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const username = aliasUsername + randomNumber;
        const findUser = await user.findOne({
            where: {
                username,
            },
        });
        if (!findUser) {
            return username;
        }
    }
};

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
        if (findUserByUsername) return returnError(400, 'username is being used');
        const findUserByEmail = await user.findOne({
            where: {
                email,
            },
        });
        if (findUserByEmail) return returnError(400, 'email is being used');

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
    const isValidPass = bcrypt.compareSync(loginPassword, passwordHash);
    if (!isValidPass) {
        return returnError(400, 'Password is not match');
    }
    const token = createToken({ userId: id, username });
    return returnSuccess({ token });
};

const loginGgUser = async (data) => {
    const { name, picture, ggId, email } = data;
    if (!name || !ggId || !email) return returnError(400, 'Invalid input');
    const findUserByGgId = await user.findOne({
        where: {
            ggId,
        },
    });

    if (findUserByGgId) {
        const { id: userId, username } = findUserByGgId.dataValues;
        const token = createToken({ userId, username, google: true });
        return returnSuccess({ token });
    }
    //findUser have email not ggId -> update ggId
    const findUserByEmail = await user.findOne({
        where: {
            email,
        },
    });

    if (findUserByEmail) {
        const { id: userId, username } = findUserByEmail.dataValues;
        await user.update(
            {
                ggId,
            },
            {
                where: { id: userId },
            }
        );
        const token = createToken({ userId, username, google: true });
        return returnSuccess({ token });
    }
    //new google login -> register
    const uniqueUsername = await getUniqueUsername(name);
    const newUser = {
        username: uniqueUsername,
        avatar: picture,
        ggId,
        email,
        passwordHash: '123',
        lastLogin: Date.now(),
    };
    const result = await user.create(newUser);
    const { id: userId } = result.dataValues;
    const token = createToken({ userId, username: uniqueUsername, google: true });
    return returnSuccess({ token });
};

export { registerUser, loginUser, loginGgUser };
