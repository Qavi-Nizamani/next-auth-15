// Create a User Model to store user data in the MongoDb database

import mongoose, { model, Schema } from "mongoose";

export interface UserDocument {
  email: string;
  passwordHash: string;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export default User;
