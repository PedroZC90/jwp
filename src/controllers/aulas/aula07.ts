import { NextFunction, Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import settings from "../../settings";

import * as data from "../../public/files/data.json";
import houses from "../../public/files/houses.json";

const router: Router = Router();

interface Info {
    slug: string,
    name: string
}

interface House extends Info {
    members: Info[]
}

const saveParameters = (request: Request, response: Response, next: NextFunction) => {
    const quantity: number = Number(request.query.quantity).valueOf();
    if (quantity === 0)
    if (quantity > 0 && quantity <= 15) {
        response.locals.quantity = quantity;
    } else {
        response.locals.quantity = Math.ceil((Math.random() * 15) + 1);
    }

    fs.writeFile(path.join(settings.__outdir, "queries.txt"), `quantity=${quantity}`, { encoding: "utf-8", flag: "a+" }, (error) => {
        console.error(error);
    })

    next();
}

/**
 * Exercicio: Lista de compras
 */
router.get("/lista-de-compras", saveParameters, (request: Request, response: Response) => {
    const quantity: number = response.locals.quantity;
    const results = (data.lista_compras || []).slice(0, quantity)
    return response.status(200).json({ quantity, results });
});

/**
 * Exercicio: Consulta da casas
 */
router.get("/houses", (request: Request, response: Response) => {
    const name = request.query.name as string;

    if (!name) {
        return response.status(400).json({ message: "Bad Request: query 'name' is required." });
    }

    const results = (houses as House[]).filter((v) => {
        const index = v.members.findIndex((u) => u.name === name || u.slug === name.toLowerCase());
        return index > 0;
    }).map((v) => v.name);

    return response.status(200).json({ results });
});

export default router;
