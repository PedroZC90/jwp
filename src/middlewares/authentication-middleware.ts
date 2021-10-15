import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret, sign, SignOptions, verify, VerifyErrors } from "jsonwebtoken";

import User, { IUser } from "../models/User";
import { IJwt } from "../types";

export async function authenticated(request: Request, response: Response, next: NextFunction) {

    const authorization = request.header("Authorization");
    if (!authorization) {
        // bad request
        return response.status(400).json({ message: "Token is missing." });
    }

    const token = getJwtToken(authorization);
    if (!token) {
        return response.status(400).json({ message: "Token do not start with 'Bearer'" });
    }

    try {
        const decodedJwt = await verifyJwtToken(token);
        if (!decodedJwt) {
            return response.status(403).json({ message: "Invalid token." });
        }

        const user = await User.findOne({ _id: decodedJwt._id, email: decodedJwt.email }).exec();
        if (!user) {
            return response.status(403).json({ message: "User not found." });
        }

        response.locals.token = token;
        response.locals.user = user;
    } catch (e) {
        return response.status(403).json({ message: "Invalid token." });
    }

    next();
}

export async function signJwtToken(user: IUser, rememberMe: boolean = false): Promise<string | null> {
    if (!process.env.JWT_SECRET) return null;

    const now: number = Math.floor(Date.now() / 1000);
    const payload: any = {
        _id: user._id,
        email: user.email,
        iat: now
        // exp: now + JWT_EXPIRATION
    };
    const secret: Secret = process.env.JWT_SECRET;
    const options: SignOptions = {}; // algorithm: "RS256"

    if (!rememberMe) {
        options.expiresIn = process.env.JWT_EXPIRATION || "24h";
    }
    return new Promise((resolve, reject) => {
        sign(payload, secret, options, (err: Error | null, token: string | undefined): void => {
            if (err) {
                reject(err);
            } else if (!token) {
                reject(new Error("not token found."));
            } else {
                console.debug("token signed user:", user.email, "token:", token);
                resolve(token);
            }
        });
    });
}

/**
 * Verify if jwt token is valid.
 * @param token                         -- jwt token got from request header.
 */
export async function verifyJwtToken(token: string): Promise<IJwt | undefined> {;
    const secret: Secret | undefined = process.env.JWT_SECRET;
    if (!secret) return;
    return new Promise((resolve, reject) => {
        verify(token, secret, (err: VerifyErrors | null, decoded: object | undefined): any => {
            if (err || !decoded) {
                reject(err);
            } else {
                console.debug("decodeding token:", decoded);
                resolve(decoded as IJwt);
            }
        });
    });
}

export function getJwtToken(token: string): string | undefined {
    const match = token.match(/(?:Bearer)\s*(.*)/);
    if (!match) return;
    return match[1];
}

export function setJwtToken(token: string): string {
    return `Bearer ${token}`;
}
