import express from "express";
import { create,getAll,getOne,update,deleteBlog} from "../controllers/blogController.js";
import upload from "../multerConfig.js"

const router = express.Router();

router.post('/create',upload.single('image'),create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id",upload.single('image'),update);
router.delete("/delete/:id", deleteBlog);

export default router;