import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastLogin: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
