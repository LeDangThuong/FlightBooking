let socket;

function connect() {
    socket = new WebSocket('ws://localhost:7050/ws');

    socket.onopen = function (event) {
        console.log('Connection established');
    };

    socket.onmessage = function (event) {
        console.log('Message received:', event.data);
        // Handle the received message here
    };

    socket.onclose = function (event) {
        console.log('Connection closed');
    };

    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };
}

function sendMessage(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.log('WebSocket is not open');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    connect();

    document.getElementById('sendButton').addEventListener('click', () => {
        const message = document.getElementById('messageInput').value;
        sendMessage(message);
    });
});
