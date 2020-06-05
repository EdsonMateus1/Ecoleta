import express from "express";
import ItemsController from "./controllers/items";
import PointController from "./controllers/point";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);


routes.get("/items",ItemsController.index);
routes.post("/points",PointController.create);
routes.get("/points/:id",PointController.show);
routes.get("/points",upload.single("image"),PointController.index);

export default routes;
