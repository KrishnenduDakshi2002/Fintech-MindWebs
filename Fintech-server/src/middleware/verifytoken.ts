import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// importing model
import { UserModel } from "../Model/auth.model";
import mongoose from "mongoose";
import { messageCustom, messageError } from "../helpers/message";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
} from "../helpers/messageTypes";

/* ------------ User auth Middleware ----------- */

interface JwtPayload {
  _id: string;
}

export default async function UserAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const TOKEN_SECRET = "dfasdjrqwu3409234dfadadfowerq3432frwij23490oi";
  try {
    const JWToken = req.headers.authorization?.split(" ")[1];
    if (typeof JWToken == "undefined") {
      return messageCustom(res, BAD_REQUEST, "token not present", {});
    } else {
      // token is not found
      if (!JWToken)
        return messageCustom(res, BAD_REQUEST, "Token is not found", {});

      // this will throw error if token is expired
      // Decoding the jwt
      /*
        if jwt is expired then it will through error
        so catch will be executed;

        if valid then we wil get _id back        
      */
      const DecodedToken = jwt.verify(JWToken, TOKEN_SECRET) as JwtPayload;

      // finding user by id
      const user = await UserModel.findById(
        new mongoose.Types.ObjectId(DecodedToken._id)
      );
      if (!user)
        return messageCustom(res, BAD_REQUEST, "user doesn't exists", {});
    
      // Adding verified to req.body
      req.body.UserId = user._id;

      // calling next function
      next();
    }
  } catch (error: any) {
    return messageError(res,UNAUTHORIZED,'expired or invalid token',error);
  }
}
