document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById("form-register");
    const nomeInput = document.getElementById("nome");
    const telInput = document.getElementById("tel");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const telefoneVal = telInput.value.trim();
        const senha = passwordInput.value;
        const confirmSenha = confirmPasswordInput.value;

        // Validação básica de campos
        if (!nome || !telefoneVal || !senha || !confirmSenha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Validação de confirmação de senha
        if (senha !== confirmSenha) {
            alert("As senhas não coincidem!");
            confirmPasswordInput.focus();
            return;
        }

        // Formatação do DDI + Telefone
        const ddiSelected = document.querySelector('input[name="ddi"]:checked')?.value || "";
        const telefoneCompleto = `${ddiSelected}${telefoneVal}`;

        // Enviar dados para o backend
        await registerUser({
            nome,
            telefone: telefoneCompleto,
            senha
        });
    });

    async function registerUser(userData) {
        const URL = "http://10.111.9.65:3001/register"; // Ajuste a rota conforme seu backend

        try {
            const req = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const res = await req.json();

            if (req.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "index.html"; // Redireciona para o login
            } else {
                alert(res.message || "Erro ao realizar o cadastro.");
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Falha na conexão com o servidor!");
        }
    }
});