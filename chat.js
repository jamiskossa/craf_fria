const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

sendMessage.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Réponse automatique
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.classList.add('message', 'system');
            responseElement.innerHTML = `<p>Merci pour votre message ! Nous vous répondrons dès que possible.</p>`;
            chatMessages.appendChild(responseElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});
