import mongoose, { Schema, Model } from "mongoose";

export interface ISiteSettings {
  _id?: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  logo: string; // base64 or URL
  updatedAt?: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, default: "SRI Saketha Rama Innovations" },
    email: { type: String, default: "saketharamainnovations@gmail.com" },
    phone: { type: String, default: "+91.7893059116" },
    address: { type: String, default: "Plot No 118, Phase 2, Kavuri Hills, Madhopur, Hyderabad, Telangana, India" },
    businessHours: { type: String, default: "Mon-Fri: 9:00 AM - 6:00 PM" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    logo: { type: String, default: "" }, // base64 or empty (uses default /assets/logo.jpg)
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
