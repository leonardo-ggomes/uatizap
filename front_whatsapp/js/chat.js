document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");

    // Rolagem automática para a última mensagem
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Formatar horário atual no padrão HH:MM
    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Envio de mensagens
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Criar elemento da mensagem enviada
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "outgoing");

        messageElement.innerHTML = `
            <div class="message-body">
                <p>${escapeHTML(messageText)}</p>
                <span class="message-time">${getCurrentTime()} <i class="fa-solid fa-check"></i></span>
            </div>
        `;

        sendMessage("+55186454578798", messageText)

        chatMessages.appendChild(messageElement);
        messageInput.value = "";
        scrollToBottom();

        // Simula a confirmação de entrega (2 tiques / tique azul)
        setTimeout(() => {
            const checkIcon = messageElement.querySelector(".message-time i");
            if (checkIcon) {
                checkIcon.className = "fa-solid fa-check-double read";
            }
        }, 1500);
    });


    async function sendMessage(friend, msg){

        const URL = "http://10.111.9.65:3001/chat"; // Ajuste a rota conforme seu backend
        const userData = {
            remetente:"+5512345",
            telefone: friend,
            msg: msg
        }

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
                console.log("mensagem enviada")

                receiveMessage()

            } else {
                console.log("Sua mensagem não pode ser enviada")
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Falha na conexão com o servidor!");
        }


    }

    // Sanitização simples para evitar xss
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    async function receiveMessage(){
         const URL = "http://10.111.9.65:3001/message"; // Ajuste a rota conforme seu backend
        const userData = {
            remetente:"+5512345",
            destinatario: "+55186454578798",
        }

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

                if(res.created)
                {
                     const history = res.history
                     

                     for(let msg of history){
                       const elChat = `
                         <div class="message incoming">
                          <div class="message-body">
                                <p>${msg.mensagem}</p>
                                <span class="message-time">14:30 <i class="fa-solid fa-check-double read"></i></span>
                            </div>
                        </div>                        
                       `

                       chatMessages.insertAdjacentHTML("beforeend", elChat)
                     }      
                     
                     
                }

               
            } else {
                console.log("Sua mensagem não pode ser enviada")
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Falha na conexão com o servidor!");
        }
    }

    scrollToBottom();
});