import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";

interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect Email or Password!", statusCode: 400 };
  }

  // const passwordMatch = password === findUser.password;
  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect Email or Password!", statusCode: 400 };
};

interface GetMyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (err) {
    throw err;
  }
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });
};
