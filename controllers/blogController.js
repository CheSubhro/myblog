import Blog from "../models/blogModel.js";
import path from 'path';
import fs from 'fs'


export const create = async(req,res)=>{
    
    try {
        const { blogtitle, blogcontent, blogauthor, category, tags, status } = req.body;
        console.log(req.body);

        const blogData = new Blog({
            blogtitle,
            blogcontent,
            blogauthor,
            category,
            tags,
            status,
        });

        // Check if there is a file in the request
        if (req.file) {
            // Assign the file path or URL to the 'image' field
            blogData.image = path.basename(req.file.path); // Adjust this based on your server configuration
        }

        const saveData = await blogData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Blog Page created successfully',
            data: saveData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export const getAll = async(req,res)=>{

    try {
        const blogData = await Blog.find();

        if (!blogData || blogData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No Blog Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Blog Page data retrieved successfully',
            data: blogData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export const getOne = async(req,res) =>{

    try {
        const id = req.params.id;
        const blogPageExist = await Blog.findById(id);
    
        if (!blogPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'Blog Page retrieved successfully',
            data: blogPageExist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
    
};

export const update = async (req, res) => {

    try {
        const id = req.params.id;
        const blogPageExist = await Blog.findById(id);

        if (!blogPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog Page Not Found',
            });
        }

        // Create a new Blog Page instance with updated fields
        const updatedBlogData = {
            blogtitle: req.body.blogtitle || blogPageExist.blogtitle,
            blogcontent: req.body.blogcontent || blogPageExist.blogcontent,
            blogauthor: req.body.blogauthor || blogPageExist.blogauthor,
            category: req.body.category || blogPageExist.category,
            tags: req.body.tags || blogPageExist.tags,
            status: req.body.status || blogPageExist.status,
        };

        // Check if there is a file in the request
        if (req.file) {

            // Log the existing image path
            console.log('Existing Image Path:', path.join('uploads/', blogPageExist.image));

            // Delete the old image file
            const oldImagePath = path.join('uploads/', blogPageExist.image);
            fs.unlinkSync(oldImagePath);

            // Assign the file path or URL to the 'image' field
            updatedBlogData.image = path.basename(req.file.path);
        }

        // Update the Blog Page data
        const updatedData = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });

        return res.status(200).json({
            status: 'success',
            message: 'Blog Page updated successfully',
            data: updatedData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const deleteBlog = async(req,res)=>{
    
    try {
        const id = req.params.id;
        const blogPageExist = await Blog.findById(id);
    
        if (!blogPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog Page Not Found',
            });
        }

        // Delete the associated image file if it exists
        if (blogPageExist.image) {
            const imagePath = path.join('uploads/', blogPageExist.image);
            fs.unlinkSync(imagePath);
        }
    
        await Blog.findByIdAndDelete(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'Blog Page Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
    
}

