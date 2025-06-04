document.addEventListener("DOMContentLoaded", function() {
    // Chat Modal Logic
    const chatButtons = document.querySelectorAll('.chat-button');
    const chatModal = document.getElementById('chat-modal');
    const chatClose = chatModal.querySelector('.close');
    const sendMessageButton = document.getElementById('send-message-button');
    const chatMessageInput = document.getElementById('chat-message');
    const chatBox = document.getElementById('chat-box');

    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            chatModal.style.display = 'block';
            const hrId = this.getAttribute('data-hr-id');
            chatModal.setAttribute('data-hr-id', hrId);
            loadChatMessages(hrId);
        });
    });

    chatClose.addEventListener('click', function() {
        chatModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === chatModal) {
            chatModal.style.display = 'none';
        }
    });

    sendMessageButton.addEventListener('click', function() {
        const message = chatMessageInput.value.trim();
        if (message) {
            const hrId = chatModal.getAttribute('data-hr-id');
            sendMessage(hrId, message);
            chatMessageInput.value = '';
        }
    });

    // Function to load chat messages
    function loadChatMessages(hrId) {
        fetch(`/api/chats/${hrId}`)
            .then(response => response.json())
            .then(data => {
                chatBox.innerHTML = '';
                data.messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.className = message.isUser ? 'chat-message user-message' : 'chat-message hr-message';
                    messageElement.textContent = message.text;
                    chatBox.appendChild(messageElement);
                });
                chatBox.scrollTop = chatBox.scrollHeight;
            })
            .catch(error => console.error('Error loading chat messages:', error));
    }

    // Function to send a message
    function sendMessage(hrId, message) {
        fetch(`/api/chats/${hrId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message user-message';
                messageElement.textContent = message;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        })
        .catch(error => console.error('Error sending message:', error));
    }

    // Profile Modal Logic
    const profileModal = document.getElementById('profile-modal');
    const profileClose = profileModal.querySelector('.profile-close');
    const profileButton = document.getElementById('profile-button');
    const profileForm = document.getElementById('profile-form');

    profileClose.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    if (profileButton) {
        profileButton.addEventListener('click', function() {
            profileModal.style.display = 'block';
        });
    }

    // Handle profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(profileForm);

            fetch('/api/update-profile', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile updated successfully');
                    profileModal.style.display = 'none';
                } else {
                    alert('Error updating profile');
                }
            })
            .catch(error => console.error('Error updating profile:', error));
        });
    }
});
