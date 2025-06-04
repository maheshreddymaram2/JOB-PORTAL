document.addEventListener('DOMContentLoaded', function() {
    // Mock data for demonstration (Replace this with actual data fetching logic)
    const hrProfileData = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        hrId: "HR12345",
        address: "123 Main Street",
        age: 30,
        image: "profile.jpg"
    };

    // Elements
    const profileContainer = document.querySelector('.profile-container');
    const profileImage = document.getElementById('profile-image');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const hrIdInput = document.getElementById('hr-id');
    const addressInput = document.getElementById('address');
    const ageInput = document.getElementById('age');
    const updateBtn = document.querySelector('button[type="submit"]');

    // Function to populate profile with data
    function populateProfile() {
        profileImage.src = `../images/${hrProfileData.image}`;
        nameInput.value = hrProfileData.name;
        emailInput.value = hrProfileData.email;
        hrIdInput.value = hrProfileData.hrId;
        addressInput.value = hrProfileData.address;
        ageInput.value = hrProfileData.age;
    }

    // Save profile data and redirect to dashboard
    function saveProfile(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Update profile data (this is where you would send data to the server)
        hrProfileData.name = nameInput.value;
        hrProfileData.email = emailInput.value;
        hrProfileData.hrId = hrIdInput.value;
        hrProfileData.address = addressInput.value;
        hrProfileData.age = ageInput.value;

        // Simulate a successful profile update
        alert('Profile updated successfully!');

        // Redirect to the dashboard after profile update
        window.location.href = '../html/dashboard.html';
    }

    // Event listener for form submission
    updateBtn.addEventListener('click', saveProfile);

    // Initial population of profile data
    populateProfile();
});
