// Function to toggle chat interfaces
function toggleChatInterface(chatType) {
    const chatInterface = document.getElementById('chat-interface');
    const userChatModal = document.getElementById('user-chat-modal');
    const adminChatModal = document.getElementById('admin-chat-modal');

    // Show or hide chat modals based on selection
    if (chatType === 'user') {
        userChatModal.style.display = 'flex';
        adminChatModal.style.display = 'none';
    } else if (chatType === 'admin') {
        adminChatModal.style.display = 'flex';
        userChatModal.style.display = 'none';
    } else {
        chatInterface.style.display = 'block';
    }
}

// Handle chat selection button clicks
document.getElementById('select-user-chat').addEventListener('click', () => {
    toggleChatInterface('user');
});

document.getElementById('select-admin-chat').addEventListener('click', () => {
    toggleChatInterface('admin');
});

// Handle closing modals
document.getElementById('close-user-chat').addEventListener('click', () => {
    document.getElementById('user-chat-modal').style.display = 'none';
});

document.getElementById('close-admin-chat').addEventListener('click', () => {
    document.getElementById('admin-chat-modal').style.display = 'none';
});

// Function to send a message
function sendMessage(chatType) {
    const messageInput = chatType === 'user' ? document.getElementById('user-message-input') : document.getElementById('admin-message-input');
    const messagesContainer = chatType === 'user' ? document.getElementById('user-chat-messages') : document.getElementById('admin-chat-messages');
    
    const message = messageInput.value.trim();
    
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = 'message';
        
        // Add sender identification
        messageElement.classList.add(chatType === 'user' ? 'user-message' : 'admin-message');
        
        messagesContainer.appendChild(messageElement);
        messageInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Optional: Save message to chat history (e.g., local storage or server-side)
        saveMessageToHistory(chatType, message);
    }
}

// Function to save message to chat history
function saveMessageToHistory(chatType, message) {
    const chatHistory = JSON.parse(localStorage.getItem(`${chatType}-chat-history`)) || [];
    chatHistory.push({ message, timestamp: new Date() });
    localStorage.setItem(`${chatType}-chat-history`, JSON.stringify(chatHistory));
}

// Example function to simulate loading chat messages
function loadChatMessages(chatType) {
    const messagesContainer = chatType === 'user' ? document.getElementById('user-chat-messages') : document.getElementById('admin-chat-messages');
    
    // Clear existing messages
    messagesContainer.innerHTML = '';

    // Load chat history from local storage
    const chatHistory = JSON.parse(localStorage.getItem(`${chatType}-chat-history`)) || [];
    chatHistory.forEach(chat => {
        const messageElement = document.createElement('div');
        messageElement.textContent = chat.message;
        messageElement.className = 'message';
        messageElement.classList.add(chatType === 'user' ? 'user-message' : 'admin-message');
        messagesContainer.appendChild(messageElement);
    });
}

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    loadChatMessages('user'); // Load chat messages for user
    loadChatMessages('admin'); // Load chat messages for admin
});

// Handle logout button click
document.getElementById('logout-button').addEventListener('click', () => {
    // Implement logout logic on the server side
    // Redirect to the home page or logout endpoint
    window.location.href = '../images/logout.html'; // Update this path as needed
});

// Function to handle new message notifications
function notifyNewMessage(chatType) {
    const notification = document.getElementById(`${chatType}-notification`);
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}

// Add event listeners to handle new message notifications
document.getElementById('user-send-message').addEventListener('click', () => {
    sendMessage('user');
    notifyNewMessage('user');
});

document.getElementById('admin-send-message').addEventListener('click', () => {
    sendMessage('admin');
    notifyNewMessage('admin');
});
