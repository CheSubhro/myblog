import mongoose from "mongoose";

const cmsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'Anonymous',
    }
},{ timestamps: true });

const Cms = mongoose.model("Cms", cmsSchema);

export default Cms;
