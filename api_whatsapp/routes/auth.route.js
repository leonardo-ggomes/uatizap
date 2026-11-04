const { Router } = require("express");
const conn = require("../db/connection");

const router = Router();

router.post("/auth", async (req, res) => {

    let isAuth = false;
    const { telefone, senha } = req.body;
    const cmd = "select * from utilizadores where telefone = ? and senha = ?;";
    const query = await conn.query(cmd,[telefone, senha]);

    if(query[0].length > 0)
    {
        isAuth = true;
    }

    res.json({
        isAuth: isAuth
    })
});

router.post("/register", async (req, res) => {
    const { nome, telefone, senha } = req.body;

    // Validação simples dos dados recebidos
    if (!nome || !telefone || !senha) {
        return res.status(400).json({
            created: false,
            message: "Todos os campos (nome, telefone, senha) são obrigatórios."
        });
    }

    try {
        // 1. Verifica se o telefone já existe no banco
        const checkCmd = "SELECT * FROM utilizadores WHERE telefone = ?;";
        const [existingUsers] = await conn.query(checkCmd, [telefone]);

        if (existingUsers.length > 0) {
            return res.status(400).json({
                created: false,
                message: "Este número de telefone já está cadastrado."
            });
        }

        // 2. Insere o novo utilizador
        const insertCmd = "INSERT INTO utilizadores (apelido, telefone, senha) VALUES (?, ?, ?);";
        await conn.query(insertCmd, [nome, telefone, senha]);

        return res.status(201).json({
            created: true,
            message: "Utilizador cadastrado com sucesso!"
        });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({
            created: false,
            message: "Erro no servidor ao tentar realizar o cadastro."
        });
    }
});

router.post("/chat", async (req, res) => {
    const { remetente, telefone, msg } = req.body;

    if (!remetente || !telefone || !msg?.trim()) {
        return res.status(400).json({
            created: false,
            message: "Dados obrigatórios não informados."
        });
    }

    try {
        const cmd = "CALL sp_enviar_mensagem(?, ?, ?)";

        await conn.query(cmd, [remetente, telefone, msg.trim()]);

        return res.status(200).json({
            created: true,
            message: "Mensagem enviada com sucesso."
        });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);

        return res.status(500).json({
            created: false,
            message: "Falha ao enviar mensagem."
        });
    }
});


router.post("/message", async (req, res) => {
    const { remetente, destinatario } = req.body;

    if (!remetente || !destinatario) {
        return res.status(400).json({
            created: false,
            message: "Remetente e destinatário são obrigatórios."
        });
    }

    try {
        const cmd = "CALL sp_obter_historico(?, ?)";

        const [result] = await conn.query(cmd, [
            remetente,
            destinatario
        ]);

        // Primeiro conjunto de resultados da procedure
        const history = Array.isArray(result[0])
            ? result[0]
            : [];

        return res.status(200).json({
            created: true,
            history,
            message: "Histórico carregado."
        });

    } catch (error) {
        console.error("Erro ao obter histórico:", error);

        return res.status(500).json({
            created: false,
            history: [],
            message: "Falha ao obter histórico."
        });
    }
});


router.get("/contacts", async (req, res) => {
    try {
        const cmd = `
            SELECT apelido, telefone
            FROM utilizadores
            ORDER BY apelido
        `;

        const [result] = await conn.query(cmd);

        return res.status(200).json({
            created: true,
            contacts: result,
            message: "Lista de contatos."
        });

    } catch (error) {
        console.error("Erro ao listar contatos:", error);

        return res.status(500).json({
            created: false,
            contacts: [],
            message: "Falha ao carregar contatos."
        });
    }
});


//Exportamos as rotas definidas no arquivo.
module.exports = router;

