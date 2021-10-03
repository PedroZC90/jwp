import { Request, Response, Router } from "express";

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

const users: IUser[] = [
    { id: 1, name: "admin", email: "admin@email.com", password: "xyz012" }
];

const router: Router = Router();

router.get("/", (request: Request, response: Response) => {
    return response.json({ users });
});

router.get("/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);
    const user = users.filter((v) => v.id === id)[0];
    return response.json({ user });
});

router.post("/", (request: Request, response: Response) => {
    const data = request.body.users as IUser[];

    data.forEach((v) => {
        const index = users.findIndex((u) => u.id === v.id || u.email === v.email);
        if (index > -1) {
            users.splice(index, 1);
        }
        users.push(v);
    });

    return response.json({ message: "users sucesfully inserted." });
});

router.put("/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);
    const user = request.body;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
        return response.status(400).json({ message: `user (id: ${id}) not found.` });
    }

    users.splice(index, 1);
    users.push(user);

    return response.json({ message: `user (id: ${id}) updated.` });
});

router.delete("/:id", (request: Request, response: Response) => {
    const id = Number(request.query.id);

    const index = users.findIndex((u) => u.id === id);
    if (index > -1) {
        users.splice(index, 1);
    }

    return response.json({ message: "user deleted." });
});

export default router;
