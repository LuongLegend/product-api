import { user } from "../models/index.js";

const registerUser = async (data) => {
  const { username, email, password } = data;
  if (!username || !email || !password || password.length < 6)
    throw new Error("missing input");
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
        msg: "username is being used",
      };
    const findUserByEmail = await user.findOne({
      where: {
        email,
      },
    });
    if (findUserByEmail)
      return {
        status: 0,
        msg: "email is being used",
      };
    await user.create(data, { fields: ["username", "email", "passwordHash"] });
  } catch (err) {
    throw new Error(err.message);
  }
};

export { registerUser };
