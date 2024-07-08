const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value;
    if (!message) return;

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerText = message;
    chatWindow.appendChild(userMessageDiv);

    // Clear input field
    userInput.value = '';

    // Send message to backend
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display bot response
        const botResponseDiv = document.createElement('div');
        botResponseDiv.className = 'message bot-response';
        botResponseDiv.innerText = data.botResponse;
        chatWindow.appendChild(botResponseDiv);

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message error-message';
        errorMessageDiv.innerText = 'Error communicating with the server. Please try again later.';
        chatWindow.appendChild(errorMessageDiv);
    }
}
