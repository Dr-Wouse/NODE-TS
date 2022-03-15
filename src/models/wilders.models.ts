import mongoose from "mongoose";
const Schema = mongoose.Schema;

// TYPAGE
interface IWilder {
  name: string;
  city: string;
  skills: { title: string; votes: number }[];
}

// SCHEMA
const WilderSchema = new Schema<IWilder>({
  name: { type: String, required: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});
export default mongoose.model("wilder", WilderSchema);
