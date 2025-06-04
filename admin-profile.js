document.addEventListener('DOMContentLoaded', function() {
    // Mock data (Replace with actual server data fetching logic)
    let adminProfileData = JSON.parse(localStorage.getItem('adminProfileData')) || {
        name: "",
        email: "",
        address: "",
        image: "default-profile.png"
    };

    // Elements
    const profileContainer = document.querySelector('.profile-container');
    const profileImage = document.getElementById('profile-image');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const updateBtn = document.querySelector('button[type="submit"]');

    // Function to populate profile with data
    function populateProfile() {
        profileImage.src = `../images/${adminProfileData.image}`;
        nameInput.value = adminProfileData.name;
        emailInput.value = adminProfileData.email;
        addressInput.value = adminProfileData.address;
    }

    // Save profile data and redirect to dashboard
    function saveProfile(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Update profile data (this is where you would send data to the server)
        adminProfileData = {
            name: nameInput.value,
            email: emailInput.value,
            address: addressInput.value,
            image: profileImage.src.split('/').pop() // Get image filename from src
        };

        // Simulate saving data to local storage (replace with server-side saving)
        localStorage.setItem('adminProfileData', JSON.stringify(adminProfileData));

        // Simulate a successful profile update
        alert('Profile updated successfully!');

        // Redirect to the dashboard after profile update
        window.location.href = '../images/admin-dashboard.html';
    }

    // Check if the profile has already been filled out (for first login)
    if (adminProfileData.name === "") {
        // If profile is not filled out, stay on the profile page to prompt admin to complete it
        populateProfile();
    } else {
        // If profile is already filled out, redirect to admin dashboard
        window.location.href = '../images/admin-dashboard.html';
    }

    // Event listener for form submission
    updateBtn.addEventListener('click', saveProfile);

    // Initial population of profile data if needed
    populateProfile();
});
