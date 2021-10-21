import { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";

import { authenticated } from "../middlewares/authentication-middleware";
import Comic, { IComic } from "../models/Comic";
import Chapter from "../models/Chapter";

const router: Router = Router();

// --------------------------------------------------
// COMIC
// --------------------------------------------------

router.get("/", authenticated, async (request: Request, response: Response) => {
    const page = Number(request.query.page) || 1;
    const rpp = Number(request.query.rpp) || 15;
    const q: string | undefined = request.query.q as string;
    const type: string | undefined = request.query.type as string;
    const status: string | undefined = request.query.status as string;
    const genres: string[] | undefined = request.query.genre as string[];

    if (page < 0) {
        return response
            .status(400)
            .json({ message: "Parameter 'page' can not be negative." });
    } else if (rpp < 0) {
        return response
            .status(400)
            .json({ message: "Parameter 'rpp' can not be negative." });
    }

    const opts: any = {};
    if (q) opts.title = { $regex: q, $options: "i" };
    if (type) opts.type = type;
    if (status) opts.status = status;
    if (genres) opts.genres = { $in: genres };

    const comics = await Comic.find({ ...opts })
        .skip(rpp * (page - 1))
        .limit(rpp)
        .exec();

    return response.json({ comics });
});

router.post(
    "/",
    authenticated,
    async (request: Request, response: Response) => {
        const comic = new Comic(request.body);

        try {
            const exists = await Comic.exists({ url: comic.url });
            if (exists) {
                return response
                    .status(400)
                    .json({ message: `Comic ${comic.url} already registered` });
            }

            await comic.save();

            return response.status(201).json({ comic });
        } catch (error) {
            return response.status(400).json(error);
        }
    },
);

router.get(
    "/:_id",
    authenticated,
    async (request: Request, response: Response) => {
        const _id: string = request.params._id;

        try {
            const comic = await Comic.findById(_id).exec();
            if (!comic) {
                return response
                    .status(400)
                    .json({ message: `Comic ${_id} not found.` });
            }
            return response.json(comic);
        } catch (error) {
            return response.status(400).json(error);
        }
    },
);

router.put(
    "/:_id",
    authenticated,
    async (request: Request, response: Response) => {
        const _id: string = request.params._id;

        const data = request.body as IComic;
        if (data._id) delete data._id;

        try {
            const comic = await Comic.findByIdAndUpdate(_id, data).exec();
            if (!comic) {
                return response
                    .status(400)
                    .json({ message: `Unable to update comic ${_id}.` });
            }

            return response.status(200).json(comic);
        } catch (error) {
            return response.status(400).json(error);
        }
    },
);

router.delete(
    "/:_id",
    authenticated,
    async (request: Request, response: Response) => {
        const _id: string = request.params._id;

        try {
            const deletedComics = await Comic.deleteOne({ _id }).exec();

            const deletedChapters = await Chapter.deleteMany({
                comic: _id,
            }).exec();

            return response.status(200).json({
                message: `Comic ${_id} successfully deleted.`,
                deletedChapters,
                deletedComics,
            });
        } catch (error: any) {
            console.error(error);
            return response.status(400).json(error?.message);
        }
    },
);

export default router;
