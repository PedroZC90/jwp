import { Request, Response, Router } from "express";

import { authenticated } from "../middlewares/authentication-middleware";
import User from "../models/User";

const router: Router = Router();

// --------------------------------------------------
// USUARIO
// --------------------------------------------------

router.get("/", authenticated , async (request: Request, response: Response) => {
    const page = Number(request.query.page) || 1;
    const rpp = Number(request.query.rpp) || 15;

    const users = await User.find()
        .skip(rpp * (page - 1))
        .limit(rpp)
        .exec();

    return response.json({ users });
});

router.post("/", authenticated, async (request: Request, response: Response) => {
    const user = new User(request.body);
    
    const exists = await User.exists({ email: user.email });
    if (exists) {
        return response.status(400).json({ message: `user ${user.email} already registered` });
    }

    await user.save();

    return response.status(201).json({ user });
});

router.get("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);
    const user = await User.findById(_id).exec();
    return response.json({ user });
});

router.put("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);
    const data = new User(request.body);

    const user = await User.findByIdAndUpdate( _id, data).exec();
    if (!user) {
        return response.status(400).json({ message: "No user updated." });
    }

    return response.status(200).json({ user });
});

router.delete("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);

    await User.replaceOne({ _id }).exec();

    return response.json({ message: `user ${_id} successfully deleted.` });
});

export default router;
