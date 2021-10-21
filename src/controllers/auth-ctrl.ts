import { Request, Response, Router } from "express";
import { signJwtToken } from "../middlewares/authentication-middleware";
import User, { IUserCredentials } from "../models/User";

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

export default router;
