import mongoose from "mongoose";
import { Schema } from "mongoose";

const memorySchema = new Schema({
    image: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
})

export default mongoose.model('Memory', memorySchema);