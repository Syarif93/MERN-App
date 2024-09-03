import mongoose, { Schema } from "mongoose";

export interface IMessage extends Document {
  email: string;
  date: Date;
  description: string;
}

const userSchema = new Schema<IMessage>(
  {
    email: {
      type: String,
      required: true,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", userSchema);
