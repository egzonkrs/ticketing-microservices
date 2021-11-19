import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

/* 
  menyra qysh me arrit me modifiku nje type definition, 
  ne global find Expres > Request shtoja currentUser.
*/
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // not logged in
  if (!req.session?.jwt) {
    return next();
  }
  // logged in
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {
    console.log(error);
  }
  next();
};