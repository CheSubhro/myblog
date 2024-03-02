import express from "express";
import { create,getAll,getOne,update,deleteCms} from "../controllers/cmsController.js";

const router = express.Router();

router.post('/create',create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteCms);

export default router;