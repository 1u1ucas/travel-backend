import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const methodColor = "\x1b[34m"; // Blue
  const urlColor = "\x1b[32m"; // Green
  const resetColor = "\x1b[0m"; // Reset

  console.log(
    `${methodColor}${req.method}${resetColor} ${urlColor}${req.url}${resetColor}`
  );

  next();
};