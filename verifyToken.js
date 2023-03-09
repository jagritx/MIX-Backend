import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.Access_token;
  if (!token) {
    return next(createError(401, "You are not authorised"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Invalid Token"));
    } else {
      req.user = user;
      next();
    }
  });
};
