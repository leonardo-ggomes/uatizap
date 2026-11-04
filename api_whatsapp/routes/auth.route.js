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

    // Validação simples dos dados recebidos
    if (!telefone || !msg) {
        return res.status(400).json({
            created: false,
            message: "Todos os campos (telefone, mensagem) são obrigatórios."
        });
    }

    try {
        
        const cmd = "CALL `sp_enviar_mensagem`(?, ?, ?)";
        const [result] = await conn.query(cmd, [remetente, telefone, msg]);
        
        if (result.affectedRows == 0) {
            return res.status(400).json({
                created: false,
                message: "Esta não pode ser enviada"
            });
        }   

        return res.status(201).json({
            created: true,
            message: "Mensagem Enviada"
        });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({
            created: false,
            message: "Falha ao enviar a mensagem"
        });
    }
});

router.post("/message", async (req, res) => {
    const { remetente, destinatario } = req.body;

    // Validação simples dos dados recebidos
    if (!remetente || !destinatario) {
        return res.status(400).json({
            created: false,
            message: "Todos os campos (remetente, destinatario) são obrigatórios."
        });
    }

    try {
        
        const cmd = "CALL `sp_obter_historico`(?, ?)";
        const [result] = await conn.query(cmd, [remetente, destinatario]);
       
        if (result[0].length == 0) {
            return res.status(400).json({
                created: false,
                message: "Nenhuma mensagem"
            });
        }   

        return res.status(201).json({
            created: true,
            history: result[0],
            message: "Historico Enviado"
        });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({
            created: false,
            message: "Falha ao enviar o historico"
        });
    }
});




//Exportamos as rotas definidas no arquivo.
module.exports = router;

