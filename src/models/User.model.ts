// Create a User Model to store user data in the MongoDb database

import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument {
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export default User;

export const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
