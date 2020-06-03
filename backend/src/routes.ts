import express from "express";
import ItemsController from "./controllers/items";
import PointController from "./controllers/point";

const routes = express.Router();

routes.get("/items",ItemsController.index);

routes.post("/points",PointController.create);
routes.get("/points/:id",PointController.show);
routes.get("/points",PointController.index);

export default routes;
