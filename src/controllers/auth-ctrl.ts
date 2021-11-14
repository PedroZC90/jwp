import { Request, Response, Router } from "express";
import { signJwtToken } from "../middlewares/authentication-middleware";
import User, { IUserCredentials, IUserRegistration } from "../models/User";

const router: Router = Router();

// --------------------------------------------------
// AUTHENTICATION
// --------------------------------------------------

router.post("/", async (request: Request, response: Response) => {
    const credentials = request.body as IUserCredentials;
    const user = await User.findOne({ ...credentials }).exec();
    if (!user) {
        return response.status(401).json({ message: "User not found." });
    }

    const token = await signJwtToken(user, false);
    if (!token) {
        return response
            .status(401)
            .json({ message: "Unable to create token." });
    }

    return response.status(200).json({ token });
});

router.post("/register", async (request: Request, response: Response) => {
    const data = request.body as IUserRegistration;
    if (!data) {
        return response
            .status(400)
            .json({ massage: "User information not found." });
    } else if (data.password !== data.password_confirm) {
        return response
            .status(400)
            .json({ massage: "Passwords do not match." });
    }

    const user = new User(data);

    const exists = await User.exists({ email: user.email });
    if (exists) {
        return response
            .status(400)
            .json({ message: `user ${user.email} already registered` });
    }

    await user.save();

    const token = await signJwtToken(user, false);
    if (!token) {
        return response
            .status(401)
            .json({ message: "Unable to create token." });
    }

    // remove password before send response
    user.set("password", undefined);

    return response.status(201).json({ token, user });
});

export default router;
