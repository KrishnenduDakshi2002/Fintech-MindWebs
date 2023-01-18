import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED
} from "../helpers/messageTypes";

// model
import {UserModel} from "../Model/auth.model";
import { LoginValidation, SignUpValidation } from "../Validation/auth.validation";

//validation

export async function verifyToken(req:Request,res: Response) {
  try {
      if (req.body.UserId !== undefined){
        return messageCustom(res,OK,"verified",{"status":"Authorized"});
      }
  } catch (error) {
    return messageError(res,SERVER_ERROR,"server error",error);
  }
}

export async function LoginController(req: Request, res: Response) {
  const TOKEN_SECRET = "dfasdjrqwu3409234dfadadfowerq3432frwij23490oi";
  try {

    //validation over req.body
    const ValidatedLogin = LoginValidation.safeParse(req.body);

    if(!ValidatedLogin.success){
      messageError(res,BAD_REQUEST,"Invalid credentials",ValidatedLogin.error);
      return;
    }

    const user = await UserModel.findOne({ email: ValidatedLogin.data.email});
    if (!user) {
      messageError(res, BAD_REQUEST, "user doesn't exists", {});
      return;
    }
    //verify password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      messageError(res, BAD_REQUEST, "Invalid password", {});
      return;
    }

    const payload = {
      _id: user._id.valueOf()
    };

    const authToken = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: "1y",
    });

    messageCustom(res, OK, "logged in", {
      authToken: authToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function SignUpController(req: Request, res: Response) {
  try {
    const ValidatedSignUP = SignUpValidation.safeParse(req.body);
    if(!ValidatedSignUP.success){
      messageError(res,BAD_REQUEST,'invalid input',ValidatedSignUP.error);
      return;
    }
    // hashing password from request
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(ValidatedSignUP.data.password, salt);

    const newValue = {...ValidatedSignUP.data,password: hashPassword}
    const newUser = await new UserModel(newValue).save();
    messageCustom(res,CREATED,"UserModel created",newUser);
  } catch (error) {
    return messageError(res, SERVER_ERROR, "server error", error);
  }
}
