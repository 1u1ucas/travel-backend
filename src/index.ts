import express, { Request, Response } from "express";
import cors from "cors";
import CommentController from "./comment/comment.controller";
import TravelController from "./travel/travel.controller";
import CategoryController from "./category/category.controller";
import LoggerService from "./middleware/logger.middleware";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(    
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(LoggerService);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});


app.use("/comment", CommentController);
app.use("/travel", TravelController);
app.use("/category", CategoryController); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});