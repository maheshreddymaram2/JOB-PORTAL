// js/thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    // Example: Redirect to home page after a delay
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to the home page after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    // Example: Add an event listener for the Sign Out button
    const signOutButton = document.getElementById('sign-out-button');
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            // Implement sign out functionality (e.g., clearing session or token)
            // For now, redirect to login page
            window.location.href = 'login.html';
        });
    }
});
