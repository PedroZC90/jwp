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
    const q: string | undefined = request.query.q as string;

    if (page < 0) {
        return response.status(400).json({ message: "Parameter 'page' can not be negative." });
    } else if (rpp < 0) {
        return response.status(400).json({ message: "Parameter 'rpp' can not be negative." });
    }

    const opts: any = {};
    if (q) opts.email = { $regex: q, $options: "i" };
    if (q) opts.name = { $regex: q, $options: "i" };

    const users = await User.find({ ...opts }, { password: 0 })
        .skip(rpp * (page - 1))
        .limit(rpp)
        .exec();

    return response.status(200).json({ users });
});

router.post("/", authenticated, async (request: Request, response: Response) => {
    const user = new User(request.body);
    
    const exists = await User.exists({ email: user.email });
    if (exists) {
        return response.status(400).json({ message: `user ${user.email} already registered` });
    }

    await user.save();

    return response.status(201).json(user);
});

router.get("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;
    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            return response.status(400).json({ message: `User ${_id} not found.` });
        }
        return response.status(200).json(user);
    } catch (error) {
        return response.status(400).json(error);
    }
});

router.put("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;

    const data: any = request.body;
    if (data._id) delete data._id;

    try {
        const user = await User.findByIdAndUpdate( _id, { ...data }).exec();
        if (!user) {
            return response.status(400).json({ message: `Unable to update user ${_id}.` });
        }

        return response.status(200).json(user);
    } catch (error) {
        return response.status(400).json(error);
    }
});

router.delete("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;

    try {
        await User.replaceOne({ _id }).exec();

        return response.json({ message: `User ${_id} successfully deleted.` });
    } catch (error) {
        return response.status(400).json(error);
    }
});

export default router;
