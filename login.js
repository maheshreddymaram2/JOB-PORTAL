document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleInputs = document.querySelectorAll('input[name="loginAs"]');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const email = emailInput.value;
        const password = passwordInput.value;
        let selectedRole = '';

        // Find the selected role
        roleInputs.forEach(input => {
            if (input.checked) {
                selectedRole = input.value;
            }
        });

        // Check credentials based on role
        if (selectedRole === 'admin' && email === 'admin@example.com' && password === 'adminpassword123') {
            window.location.href = '../images/admin-dashboard.html'; // Redirect to admin dashboard
        } else if (selectedRole === 'user' && email === 'user@example.com' && password === 'userpassword123') {
            window.location.href = '../html/user-dashboard.html'; // Redirect to user dashboard (assuming it's named user-dashboard.html)
        } else if (selectedRole === 'hr' && email === 'hr@example.com' && password === 'hrpassword123') {
            window.location.href = '../html/hr-dashboard.html'; // Redirect to HR dashboard (assuming it's named hr-dashboard.html)
        } else {
            alert('Invalid credentials or role. Please try again.');
        }
    });
});
