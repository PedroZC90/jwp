import { Request, Response, Router } from "express";

import crud from "../../public/files/crud.json";

interface IOficina {
    _id: number,
    nome: string,
    professor: string,
    local: number,
    participantes: number[]
}

interface ILocal {
    _id: number,
    nome: string,
    capacidade: number
}

interface IUsuario {
    _id: number,
    nome: string
}

interface IData {
    oficina: IOficina[],
    local: ILocal[],
    usuarios: IUsuario[]
}

const data: IData = crud;

const router: Router = Router();

// --------------------------------------------------
// EXERCICIO 10:
// --------------------------------------------------

router.get("/usuarios/", (request: Request, response: Response) => {
    return response.json({ usuarios: data.usuarios });
});

router.post("/usuarios/", (request: Request, response: Response) => {
    const body = request.body.usuarios as IUsuario[];

    body.forEach((v) => {
        const index = body.findIndex((u) => u._id === v._id);
        if (index > -1) {
            data.usuarios.splice(index, 1);
        }
        data.usuarios.push(v);
    });

    return response.json({ message: "users sucesfully inserted." });
});

router.get("/usuarios/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);
    const user = data.usuarios.filter((v) => v._id === id)[0];
    return response.json({ user });
});

router.put("/usuarios/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);
    const user = request.body;

    const index = data.usuarios.findIndex((u) => u._id === id);
    if (index === -1) {
        return response.status(400).json({ message: `user (id: ${id}) not found.` });
    }

    data.usuarios.splice(index, 1);
    data.usuarios.push(user);

    return response.json({ message: `user (id: ${id}) updated.` });
});

router.delete("/usuarios/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);

    const index = data.usuarios.findIndex((u) => u._id === id);
    if (index > -1) {
        data.usuarios.splice(index, 1);
    }

    return response.json({ message: "user deleted." });
});

// --------------------------------------------------
// LOCAL
// --------------------------------------------------

router.get("/local/", (request: Request, response: Response) => {
    return response.json({ local: data.local });
});

router.post("/local/", (request: Request, response: Response) => {
    const body = request.body.local as ILocal[];

    body.forEach((v) => {
        const index = body.findIndex((u) => u._id === v._id);
        if (index > -1) {
            data.local.splice(index, 1);
        }
        data.local.push(v);
    });

    return response.json({ message: "local sucesfully inserted." });
});

router.get("/local/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const local = data.local.filter((v) => v._id === id)[0];
    return response.json({ local });
});

router.put("/local/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const local = request.body;

    const index = data.local.findIndex((u) => u._id === id);
    if (index === -1) {
        return response.status(400).json({ message: `local (id: ${id}) not found.` });
    }

    data.local.splice(index, 1);
    data.local.push(local);

    return response.json({ message: `local (id: ${id}) updated.` });
});

router.delete("/local/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const index = data.local.findIndex((v) => v._id === id);
    if (index > -1) {
        data.local.splice(index, 1);
    }

    return response.json({ message: "local deleted." });
});

// --------------------------------------------------
// OFICINA
// --------------------------------------------------

router.get("/oficinas/", (request: Request, response: Response) => {
    return response.json({ oficina: data.oficina });
});

router.post("/oficinas/", (request: Request, response: Response) => {
    const body = request.body.oficina as IOficina[];

    body.forEach((v) => {
        const index = body.findIndex((u) => u._id === v._id);
        if (index > -1) {
            data.oficina.splice(index, 1);
        }
        data.oficina.push(v);
    });

    return response.json({ message: "oficina sucesfully inserted." });
});

router.get("/oficinas/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const oficina = data.oficina.filter((v) => v._id === id)[0];
    return response.json({ oficina });
});

router.put("/oficinas/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const oficina = request.body;

    const index = data.local.findIndex((u) => u._id === id);
    if (index === -1) {
        return response.status(400).json({ message: `oficina (id: ${id}) not found.` });
    }

    data.local.splice(index, 1);
    data.local.push(oficina);

    return response.json({ message: `oficina (id: ${id}) updated.` });
});

router.delete("/oficinas/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const index = data.oficina.findIndex((v) => v._id === id);
    if (index > -1) {
        data.oficina.splice(index, 1);
    }

    return response.json({ message: "oficina deleted." });
});

export default router;
