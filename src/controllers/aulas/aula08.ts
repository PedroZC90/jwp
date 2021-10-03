import { Request, Response, Router } from "express";

import { random_integer } from "../../utils";
import data from "../../public/files/gerador_jogadores.json";

interface IGeradorJogadores {
    nome: string[],
    sobrenome: string[],
    posicao: string[],
    clube: string[]
}

const router: Router = Router();

router.get("/gerador", (request: Request, response: Response) => {
    const filtro = request.query.filtro as string;

    const nome: string = data.nome[ random_integer(0, data.nome.length) ];
    const sobrenome: string = data.sobrenome[ random_integer(0, data.sobrenome.length) ];
    const idade: number = random_integer(17, 40);
    const posicao: string = data.posicao[ random_integer(0, data.posicao.length) ];
    const clube: string = data.clube[ random_integer(0, data.clube.length) ];

    let idade_text: string | undefined;
    if (filtro === "idade") {
        if (idade > 35) {
            idade_text = "master";
        } else if (idade > 28) {
            idade_text = "veterano";    
        } else if (idade > 21) {
            idade_text = "profissional";
        } else {
            idade_text = "novato";
        }
    } else {
        idade_text = `${idade} anos`
    }

    return response.json({ message: `${nome} ${sobrenome} é um futebolista brasileiro de ${idade_text} que atua como ${posicao}. Atualmente defende o ${clube}.` });
});

export default router;
