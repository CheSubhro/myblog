import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    
    blogtitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogcontent: {
        type: String,
        required: true,
    },
    blogauthor: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Assuming you store the image URL or path
    },
    category: {
        type: String,
        enum: ['Technology', 'Travel', 'Food', 'Other'], // Dropdown options
    },
    tags: {
        type: [String], // Array of strings for multiple checkboxes
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'], // Radio button options
    },
},{ timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;