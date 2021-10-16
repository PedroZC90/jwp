import { Request, Response, Router } from "express";

import { authenticated } from "../middlewares/authentication-middleware";
import Chapter from "../models/Chapter";

const router: Router = Router();

// --------------------------------------------------
// CHAPTER
// --------------------------------------------------

router.get("/", authenticated , async (request: Request, response: Response) => {
    const page = Number(request.query.page) || 1;
    const rpp = Number(request.query.rpp) || 15;
    const from = (typeof request.query.from === "string") ? new Date(request.query.from) : null;
    const to = (typeof request.query.to === "string") ? new Date(request.query.to) : null;

    if (page < 0) {
        return response.status(400).json({ message: "Parameter 'page' can not be negative." });
    } else if (rpp < 0) {
        return response.status(400).json({ message: "Parameter 'rpp' can not be negative." });
    }

    const opts: any = {};
    if (from || to) opts.released_at = {};
    if (from) opts.released_at.$gte = from.toISOString();
    if (to) opts.released_at.$lt = to.toISOString();

    const chapters = await Chapter.find({ ...opts })
        .skip(rpp * (page - 1))
        .limit(rpp)
        .exec();

    return response.json({ chapters });
});

router.post("/", authenticated, async (request: Request, response: Response) => {
    const chapter = new Chapter(request.body);
    
    const exists = await Chapter.exists({ url: chapter.url });
    if (exists) {
        return response.status(400).json({ message: `chapter ${chapter.url } is already registered.` });
    }

    await chapter.save();

    return response.status(201).json(chapter);
});

router.get("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;
    
    try {
        const chapter = await Chapter.findById(_id).exec();
        if (!chapter) {
            return response.status(400).json({ message: `chapter ${_id} not found.` });
        }
        return response.status(200).json(chapter);
    } catch(error) {
        return response.status(400).json(error);
    }
});

router.put("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;

    const data = request.body;
    if (data._id) delete data._id;

    try {
        const chapter = await Chapter.findByIdAndUpdate( _id, { ...data }).exec();
        if (!chapter) {
            return response.status(400).json({ message: "No chapter updated." });
        }

        return response.status(200).json({ chapter });
    } catch (error) {
        return response.status(400).json(error);
    }
});

router.delete("/:_id", authenticated, async (request: Request, response: Response) => {
    const _id: string = request.params._id;

    try {
        await Chapter.replaceOne({ _id }).exec();

        return response.status(200).json({ message: `chapter ${_id} successfully deleted.` });
    } catch (error) {
        return response.status(400).json(error);
    }
});

export default router;
