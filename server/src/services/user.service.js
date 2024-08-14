import UserSchema from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async ({ firstName, lastName, email, role, gender, mobile, password }) => {
  const exitistingUser = await UserSchema.findOne({
    email
  });

  if (exitistingUser) {
    throw {
      status: 400,
      message: 'User already exists'
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserSchema({
    firstName,
    lastName,
    email,
    role,
    gender,
    mobile,
    password: hashedPassword
  });

  await user.save();
  return user;
};
