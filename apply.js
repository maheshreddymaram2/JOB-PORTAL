// js/apply.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('application-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form values
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const mobileNumber = document.getElementById('mobile-number').value.trim();
        const email = document.getElementById('email').value.trim();
        const resume = document.getElementById('resume').files.length;

        // Basic validation
        if (!firstName || !lastName || !mobileNumber || !email || resume === 0) {
            alert('Please fill out all fields and upload your resume.');
            return;
        }

        // Additional validation for mobile number (optional example)
        const mobileNumberPattern = /^[0-9]{10}$/; // Example pattern for 10-digit phone numbers
        if (!mobileNumberPattern.test(mobileNumber)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        // Form is valid; you can submit it via AJAX or show a success message
        // For example, you can submit the form via AJAX
        const formData = new FormData(form);

        fetch('/submit-application', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data (e.g., show success message or redirect)
            alert('Application submitted successfully!');
            window.location.href = 'thankyou.html'; // Redirect to thank you page
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            alert('There was an error submitting your application. Please try again.');
        });
    });
});
