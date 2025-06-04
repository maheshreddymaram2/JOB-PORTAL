document.addEventListener('DOMContentLoaded', () => {
    loadAdminDetails();
    loadJobPosts();
    loadHRList();
    loadChatHistory(); // Load chat history on page load

    document.getElementById('addJobForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addJobPost();
    });

    document.getElementById('company-details-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updateCompanyDetails();
    });

    document.getElementById('send-chat-button').addEventListener('click', () => {
        sendChatMessage();
    });

    document.getElementById('chat-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });

    document.getElementById('logout-button').addEventListener('click', () => {
        logout();
    });
});

function logout() {
    // Redirect to login page or handle logout
    window.location.href = 'login.html'; // Example redirect
}

function loadAdminDetails() {
    fetch('/api/admin-details') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const adminDetails = document.getElementById('admin-details');
            adminDetails.innerHTML = `
                <p>Name: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>Company: ${data.company}</p>
                <p>Location: ${data.location}</p>
            `;
        })
        .catch(error => console.error('Error loading admin details:', error));
}

function loadJobPosts() {
    fetch('/api/jobs') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const jobTableBody = document.querySelector('#job-table tbody');
            jobTableBody.innerHTML = data.map(job => `
                <tr id="job-${job.id}">
                    <td>${job.title}</td>
                    <td>${job.description}</td>
                    <td>${job.location}</td>
                    <td>${job.salary}</td>
                    <td>${job.hrName}</td>
                    <td><button onclick="deleteJobPost(${job.id})">Delete</button></td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error loading job posts:', error));
}

function addJobPost() {
    const formData = new FormData(document.getElementById('addJobForm'));
    fetch('/api/add-job', { // Replace with your API endpoint
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(() => {
        loadJobPosts();
        document.getElementById('addJobForm').reset();
    })
    .catch(error => console.error('Error adding job post:', error));
}

function deleteJobPost(jobId) {
    fetch(`/api/delete-job/${jobId}`, { // Replace with your API endpoint
        method: 'DELETE',
    })
    .then(() => {
        document.getElementById(`job-${jobId}`).remove();
    })
    .catch(error => console.error('Error deleting job post:', error));
}

function loadHRList() {
    fetch('/api/hr-list') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const hrList = document.getElementById('hr-list');
            hrList.innerHTML = data.map(hr => `
                <li>${hr.name} - ${hr.email}</li>
            `).join('');
        })
        .catch(error => console.error('Error loading HR list:', error));
}

function updateCompanyDetails() {
    const formData = new FormData(document.getElementById('company-details-form'));
    fetch('/api/update-company', { // Replace with your API endpoint
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(() => {
        alert('Company details updated successfully!');
    })
    .catch(error => console.error('Error updating company details:', error));
}

function loadChatHistory() {
    fetch('/api/admin/chat') // Replace with your chat history API endpoint
        .then(response => response.json())
        .then(data => {
            const chatHistory = document.getElementById('chat-history');
            chatHistory.innerHTML = data.map(msg => `
                <div><strong>${msg.sender}:</strong> ${msg.text}</div>
            `).join('');
            chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom
        })
        .catch(error => console.error('Error loading chat history:', error));
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (message === '') return;

    fetch('/api/admin/chat/send', { // Replace with your send chat API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
    })
    .then(response => response.json())
    .then(() => {
        chatInput.value = '';
        loadChatHistory(); // Refresh chat history
    })
    .catch(error => console.error('Error sending chat message:', error));
}
