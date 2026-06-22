import mongoose, { Schema, Model } from "mongoose";

export interface INewsletter {
  _id?: string;
  email: string;
  subscribedAt?: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "subscribedAt", updatedAt: false },
  }
);

const Newsletter: Model<INewsletter> = mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;
