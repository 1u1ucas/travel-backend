import { Router } from "express";
import CommentService from "./comment.service";

const TravelController = Router();

TravelController.get("/", CommentService.getAll);
TravelController.post("/", CommentService.create);
TravelController.get("/:id", CommentService.getOne);
TravelController.get("/travel/:travel_id", CommentService.getAllByTravelId);
TravelController.get("/:id", CommentService.update);
TravelController.get("/:id", CommentService.remove);

export default TravelController;