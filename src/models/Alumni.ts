import { Schema, models, model } from "mongoose";

const SocialsSchema = new Schema(
  {
    linkedin: { type: String },
    instagram: { type: String },
    linktree: { type: String },
  },
  { _id: false }
);

const AlumniSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passoutYear: { type: Number, required: true },
    passwordHash: { type: String, required: true },
    socials: { type: SocialsSchema, default: {} },
  },
  { timestamps: true }
);

export type AlumniDoc = {
  _id: string;
  name: string;
  email: string;
  passoutYear: number;
  passwordHash: string;
  socials?: { linkedin?: string; instagram?: string; linktree?: string };
};

export default models.Alumni || model("Alumni", AlumniSchema);