import Cms from "../models/cmsModel.js"

export const create = async(req,res)=>{

    try {
        const { title, content, author } = req.body;

        const cmsData = new Cms({
            title,
            content,
            author
        });

        const saveData = await cmsData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Cms Page created successfully',
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

export const getAll = async (req, res) => {

    try {
        const cmsData = await Cms.find();

        if (!cmsData || cmsData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No CMS Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'CMS Page data retrieved successfully',
            data: cmsData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const getOne = async(req,res) =>{

    try {
        const id = req.params.id;
        const cmsPageExist = await Cms.findById(id);
    
        if (!cmsPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'CMS Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'CMS Page retrieved successfully',
            data: cmsPageExist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
    
};

export const update = async(req,res)=>{
   
    try {
        const id = req.params.id;
        const cmsPageExist = await Cms.findById(id);
    
        if (!cmsPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'CMS Page Not Found',
            });
        }
    
        // Create a new CMS Page instance with updated fields
        const updatedCmsData = {
            title: req.body.title || cmsPageExist.title,
            content: req.body.content || cmsPageExist.content,
            author: req.body.author || cmsPageExist.author,
        };
    
        // Update the CMS Page data
        const updatedData = await Cms.findByIdAndUpdate(id, updatedCmsData, { new: true });
    
        return res.status(200).json({
            status: 'success',
            message: 'CMS Page updated successfully',
            data: updatedData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
    
}

export const deleteCms = async(req,res)=>{
    
    try {
        const id = req.params.id;
        const cmsPageExist = await Cms.findById(id);
    
        if (!cmsPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'CMS Page Not Found',
            });
        }
    
        await Cms.findByIdAndDelete(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'CMS Page Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
    
}
