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

    // Sanitização simples para evitar xss
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    scrollToBottom();
});