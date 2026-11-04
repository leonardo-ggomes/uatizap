document.addEventListener("DOMContentLoaded", () => {

    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");
    const chatList = document.getElementById("chat-list");

    // Elementos do Cabeçalho do Chat Aberto
    const chatHeaderName = document.getElementById("chat-header-name");
    const chatHeaderStatus = document.getElementById("chat-header-status");

    const myPhone = localStorage.getItem("meu_numero");
    const API = "http://10.111.9.65:3001";

    // Estado da aplicação
    let currentContact = null;
    let currentContactName = "";

    // Armazena histórico e quantidade de não lidas por telefone
    const knownHistories = {}; // phone -> string JSON
    const unreadCounts = {};   // phone -> number

    // Solicita permissão para notificações nativas do sistema
    function requestNotificationPermission() {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }

    // Toca som suave estilo WhatsApp
    function playNotificationSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.type = "sine";
            osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
            gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.start();
            osc1.stop(audioCtx.currentTime + 0.12);

            setTimeout(() => {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.type = "sine";
                osc2.frequency.setValueAtTime(1200, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.start();
                osc2.stop(audioCtx.currentTime + 0.18);
            }, 70);
        } catch (e) {
            console.warn("Áudio não suportado ou bloqueado:", e);
        }
    }

    // Exibe o Toast Notification na tela
    function showToast(title, textMessage, phone) {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            container.classList.add("toast-container");
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.classList.add("toast-card");

        const header = document.createElement("div");
        header.classList.add("toast-header");
        header.innerHTML = `<span><i class="fa-solid fa-comment-dots"></i> ${title}</span><small>agora</small>`;

        const body = document.createElement("div");
        body.classList.add("toast-body");
        body.textContent = textMessage;

        toast.appendChild(header);
        toast.appendChild(body);

        // Ao clicar no Toast, abre o chat correspondente imediatamente
        toast.addEventListener("click", () => {
            const targetBtn = document.querySelector(`.chat-item[data-phone="${phone}"]`);
            if (targetBtn) targetBtn.click();
            toast.remove();
        });

        container.appendChild(toast);

        // Remove automaticamente após 4 segundos
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Dispara Som, Toast e Notificação de Sistema
    function triggerNotification(senderName, textMessage, phone) {
        playNotificationSound();
        showToast(senderName, textMessage, phone);

        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(senderName || "Nova mensagem", {
                body: textMessage,
                icon: "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
            });
        }

        if (document.hidden) {
            document.title = `(1) ${senderName || "Nova mensagem"}`;
        }
    }

    window.addEventListener("focus", () => {
        document.title = "Uatizap - Web";
    });

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    }

    function createMessage(msg) {
        const isOutgoing = msg.telefone_remetente === myPhone;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", isOutgoing ? "outgoing" : "incoming");

        const messageBody = document.createElement("div");
        messageBody.classList.add("message-body");

        const paragraph = document.createElement("p");
        paragraph.textContent = msg.mensagem;

        const time = document.createElement("span");
        time.classList.add("message-time");

        if (msg.data_envio) {
            time.textContent = new Date(msg.data_envio).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            });
        } else {
            time.textContent = getCurrentTime();
        }

        if (isOutgoing) {
            const check = document.createElement("i");
            check.className = "fa-solid fa-check-double read";
            time.appendChild(document.createTextNode(" "));
            time.appendChild(check);
        }

        messageBody.appendChild(paragraph);
        messageBody.appendChild(time);
        messageElement.appendChild(messageBody);

        return messageElement;
    }

    function renderHistory(history) {
        chatMessages.innerHTML = "";
        history.forEach(msg => {
            chatMessages.appendChild(createMessage(msg));
        });
        scrollToBottom();
    }

    function updateUnreadBadge(contactItem, count) {
        let lastMsgContainer = contactItem.querySelector(".chat-last-msg");
        let badge = contactItem.querySelector(".unread-badge");

        if (count > 0) {
            if (!badge) {
                badge = document.createElement("span");
                badge.classList.add("unread-badge");
                lastMsgContainer.appendChild(badge);
            }
            badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }
    }

    // Busca mensagens e gerencia a renderização
    async function checkMessagesForContact(phone, name, forceRender = false) {
        try {
            const req = await fetch(`${API}/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ remetente: myPhone, destinatario: phone })
            });

            const res = await req.json();
            if (!req.ok || !res.created) return;

            const history = res.history || [];
            const historySignature = JSON.stringify(history);
            const contactItem = document.querySelector(`.chat-item[data-phone="${phone}"]`);

            // Atualiza preview no menu lateral
            if (history.length > 0 && contactItem) {
                const lastMsg = history[history.length - 1];
                const preview = contactItem.querySelector(".chat-last-msg p");
                const timeSpan = contactItem.querySelector(".chat-time");

                if (preview) preview.textContent = lastMsg.mensagem;
                if (timeSpan && lastMsg.data_envio) {
                    timeSpan.textContent = new Date(lastMsg.data_envio).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                }
            }

            // Se a renderização for forçada (ao clicar no contato)
            if (phone === currentContact && forceRender) {
                knownHistories[phone] = historySignature;
                renderHistory(history);
                return;
            }

            // Primeiro carregamento em segundo plano
            if (!(phone in knownHistories)) {
                knownHistories[phone] = historySignature;
                if (phone === currentContact) {
                    renderHistory(history);
                }
                return;
            }

            // Se o histórico mudou (chegou nova mensagem)
            if (knownHistories[phone] !== historySignature) {
                const oldHistory = JSON.parse(knownHistories[phone]);
                knownHistories[phone] = historySignature;

                if (history.length > oldHistory.length) {
                    const newMsg = history[history.length - 1];

                    if (newMsg.telefone_remetente !== myPhone) {
                        // Se for de outro chat que não o aberto
                        if (phone !== currentContact) {
                            unreadCounts[phone] = (unreadCounts[phone] || 0) + (history.length - oldHistory.length);
                            if (contactItem) {
                                updateUnreadBadge(contactItem, unreadCounts[phone]);
                            }
                            triggerNotification(name, newMsg.mensagem, phone);
                        } else {
                            // Se for o chat aberto
                            renderHistory(history);
                            if (document.hidden) {
                                triggerNotification(name, newMsg.mensagem, phone);
                            }
                        }
                    } else if (phone === currentContact) {
                        renderHistory(history);
                    }
                }
            }

        } catch (error) {
            console.error(`Erro ao checar mensagens de ${phone}:`, error);
        }
    }

    // Monitora todas as conversas periodicamente
    async function pollAllContacts() {
        const items = Array.from(document.querySelectorAll(".chat-item"));
        await Promise.all(items.map(item => {
            const phone = item.dataset.phone;
            const name = item.dataset.name;
            return phone ? checkMessagesForContact(phone, name) : Promise.resolve();
        }));
    }

    // Enviar mensagem
    async function sendMessage(friend, message) {
        try {
            const req = await fetch(`${API}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    remetente: myPhone,
                    telefone: friend,
                    msg: message
                })
            });

            const res = await req.json();
            if (!req.ok || !res.created) throw new Error(res.message || "Falha ao enviar mensagem.");

            return true;
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            alert("Não foi possível enviar a mensagem.");
            return false;
        }
    }

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();

        if (!messageText) return;
        if (!currentContact) {
            alert("Selecione um contato primeiro.");
            return;
        }

        const friend = currentContact;
        messageInput.disabled = true;

        const sent = await sendMessage(friend, messageText);
        messageInput.disabled = false;

        if (sent) {
            messageInput.value = "";
            await checkMessagesForContact(friend, currentContactName, true);
        }

        messageInput.focus();
    });

    // Carregar lista de contatos
    async function receiveContacts() {
        try {
            const req = await fetch(`${API}/contacts`);
            const res = await req.json();

            if (!req.ok || !res.created) return;

            chatList.innerHTML = "";

            res.contacts.forEach(contact => {
                if (contact.telefone === myPhone) return;

                const button = document.createElement("button");
                button.type = "button";
                button.classList.add("chat-item");
                button.dataset.phone = contact.telefone;
                button.dataset.name = contact.apelido;

                const img = document.createElement("img");
                img.src = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg";
                img.classList.add("avatar");
                img.alt = "Foto do contato";

                const info = document.createElement("div");
                info.classList.add("chat-info");

                const header = document.createElement("div");
                header.classList.add("chat-info-header");

                const name = document.createElement("span");
                name.classList.add("chat-name");
                name.textContent = contact.apelido;

                const time = document.createElement("span");
                time.classList.add("chat-time");

                const lastMessage = document.createElement("div");
                lastMessage.classList.add("chat-last-msg");

                const preview = document.createElement("p");
                preview.textContent = "Carregando...";

                header.appendChild(name);
                header.appendChild(time);
                lastMessage.appendChild(preview);

                info.appendChild(header);
                info.appendChild(lastMessage);

                button.appendChild(img);
                button.appendChild(info);

                chatList.appendChild(button);
            });

            await pollAllContacts();

        } catch (error) {
            console.error("Erro ao carregar contatos:", error);
        }
    }

    // Clique no contato
    chatList.addEventListener("click", async (e) => {
        const chat = e.target.closest(".chat-item");
        if (!chat || !chatList.contains(chat)) return;

        const phone = chat.dataset.phone;
        const name = chat.dataset.name;
        if (!phone) return;

        requestNotificationPermission();

        currentContact = phone;
        currentContactName = name;

        // Limpa contador de mensagens não lidas
        unreadCounts[phone] = 0;
        updateUnreadBadge(chat, 0);

        // Atualiza cabeçalho do chat
        chatHeaderName.textContent = name;
        chatHeaderStatus.textContent = "online";

        document.querySelectorAll(".chat-item").forEach(item => item.classList.remove("active"));
        chat.classList.add("active");

        chatMessages.innerHTML = "";

        // O parâmetro `true` força a busca e renderização imediata das mensagens
        await checkMessagesForContact(phone, name, true);
    });

    if (!myPhone) {
        alert("Número do usuário não encontrado. Faça login novamente.");
        return;
    }

    receiveContacts();

    // Verificação periódica a cada 3 segundos
    setInterval(() => {
        pollAllContacts();
    }, 3000);

});