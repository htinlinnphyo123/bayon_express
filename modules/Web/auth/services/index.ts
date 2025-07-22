import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userRepository } from "@domain/user/user.repository";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticateUser(email: string, password: string) {
  const user = await userRepository.where("email", email).first();
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.services.password.bcrypt);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
  const safeUser = {
    id: user.id,
    name: user.username,
    email: user.email,
  };

  return { user: safeUser, token };
}

export async function createUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const existingUser = await userRepository.where("email", email).first();
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.create({
    email,
    username: name,
    services: {
      email: null,
      facebook: {
        accessToken: '',
        email: '',
        expiresAt: null,
        first_name: '',
        id: '',
        last_name: '',
        name: '',
        name_format: '',
        short_name: null,
        picture: {
          data: {
            height: null,
            is_silhouette: false,
            url: '',
            width: null
          }
        },
      },
      google: {
        accessToken: '',
        email: '',
        expiresAt: 0,
        id: '',
        picture: '',
        scope: [],
        verified_email: false
      },
      resume: {
        haveLoginTokensToDelete: null,
        loginTokens: null
      },
      password: {
        bcrypt: hashedPassword,
        enroll: null,
        reset: null,
      },
    },
  });
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.username,
  };
}
