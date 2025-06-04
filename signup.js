document.addEventListener('DOMContentLoaded', () => {
    // Toggle bar functionality
    const toggleBar = document.querySelector('.toggle-bar');
    const navMenu = document.getElementById('navMenu');

    if (toggleBar) {
        toggleBar.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // No need for userType-based form update since the fields were removed
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    
    // Handle form submission
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting

        // Gather form data
        const formData = new FormData(signupForm);
        const userType = formData.get('userType');

        // Redirect based on user type
        if (userType === 'hr') {
            window.location.href = 'hr-profile.html'; // Redirect to HR profile
        } else {
            window.location.href = 'user-profile.html'; // Redirect to User profile
        }
    });
});
