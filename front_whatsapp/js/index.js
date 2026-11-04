// Elementos da interface
const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");

const telInput = document.querySelector("#tel");
const passwordInput = document.querySelector("#password");

const btnNext = document.querySelector("#btn-next-1");
const btnBack = document.querySelector("#btn-back");
const btnLogin = document.querySelector("#btn-login");

// 1. Avançar para a etapa de senha
btnNext.addEventListener("click", () => {
    if (!telInput.value.trim()) {
        alert("Por favor, informe seu telefone.");
        telInput.focus();
        return;
    }

    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    passwordInput.focus();
});

// 2. Voltar para a etapa do telefone
if (btnBack) {
    btnBack.addEventListener("click", () => {
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
        telInput.focus();
    });
}

// 3. Enviar dados ao clicar em "Entrar"
btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!passwordInput.value.trim()) {
        alert("Por favor, digite sua senha.");
        passwordInput.focus();
        return;
    }

    await fetchAPI();
});

// 4. Requisição à API
async function fetchAPI() {
    const URL = "http://10.111.9.102:3001/auth";

    // Captura o DDI selecionado (+55, +1, etc.)
    const ddiSelected = document.querySelector('input[name="ddi"]:checked')?.value || "";
    const telefoneCompleto = `${ddiSelected}${telInput.value.trim()}`;

    try {
        const req = await fetch(URL, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ 
                telefone: telefoneCompleto, // Envia o DDI + Telefone
                senha: passwordInput.value  // Envia a senha digitada
            })
        });

        const res = await req.json();

        if (req.ok) {
            console.log("Autenticado com sucesso:", res);
            // Redirecionar usuário ou salvar token aqui
        } else {
            console.log("Erro na resposta:", res);
            alert(res.message || "Telefone ou senha incorretos.");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("A conexão com o servidor falhou!");
    }
}