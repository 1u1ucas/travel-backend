import { Router } from "express";
import CategoryService from "./category.service";

const TravelController = Router();

TravelController.get("/", CategoryService.getAll);
TravelController.post("/", CategoryService.create);
TravelController.get("/:id", CategoryService.getOne);
TravelController.get("/:id", CategoryService.update);
TravelController.get("/:id", CategoryService.remove);

export default TravelController;