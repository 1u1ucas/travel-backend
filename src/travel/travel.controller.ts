import { Router } from "express";
import TravelService from "./travel.service";

const TravelController = Router();

TravelController.get("/", TravelService.getAll);
TravelController.post("/", TravelService.create);
TravelController.get("/:id", TravelService.getOne);
TravelController.get("/:id", TravelService.update);
TravelController.get("/:id", TravelService.remove);

export default TravelController;