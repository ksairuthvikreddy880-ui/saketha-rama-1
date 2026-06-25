import mongoose, { Schema, Model } from "mongoose";

export interface IMail {
  _id?: string;
  name: string;
  email: string;
  project: string;
  read: boolean;
  createdAt?: Date;
}

const MailSchema = new Schema<IMail>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    project: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Mail: Model<IMail> =
  mongoose.models.Mail || mongoose.model<IMail>("Mail", MailSchema);

export default Mail;
