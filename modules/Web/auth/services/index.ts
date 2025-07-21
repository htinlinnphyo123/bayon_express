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

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
  const safeUser = {
    id: user.id,
    name: user.name,
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
    name,
    password: hashedPassword,
  });
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };
}
