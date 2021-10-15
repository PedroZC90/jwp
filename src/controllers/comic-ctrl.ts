import { Request, Response, Router } from "express";

import { authenticated } from "../middlewares/authentication-middleware";
import Comic from "../models/comic";

const router: Router = Router();

// --------------------------------------------------
// USUARIO
// --------------------------------------------------

router.get("/", authenticated , async (request: Request, response: Response) => {
    const page = Number(request.query.page) || 1;
    const rpp = Number(request.query.rpp) || 15;

    const users = await Comic.find()
        .skip(rpp * (page - 1))
        .limit(rpp)
        .exec();

    return response.json({ users });
});

router.post("/", authenticated, async (request: Request, response: Response) => {
    const comic = new Comic(request.body);
    
    const exists = await Comic.exists({ url: comic.url });
    if (exists) {
        return response.status(400).json({ message: `comci ${comic.url } already registered` });
    }

    await comic.save();

    return response.status(201).json({ comic });
});

router.get("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);
    const comic = await Comic.findById(_id).exec();
    return response.json({ comic });
});

router.put("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);
    const data = new Comic(request.body);

    const comic = await Comic.findByIdAndUpdate( _id, data).exec();
    if (!comic) {
        return response.status(400).json({ message: "No comic updated." });
    }

    return response.status(200).json({ comic });
});

router.delete("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: number = Number(request.query._id);

    await Comic.replaceOne({ _id }).exec();

    return response.json({ message: `comic ${_id} successfully deleted.` });
});

export default router;
