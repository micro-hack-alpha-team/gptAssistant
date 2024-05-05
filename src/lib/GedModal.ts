import mongoose from "mongoose";


const GedSchema = new mongoose.Schema({});

export default mongoose.models.Ged || mongoose.model('Ged', GedSchema);