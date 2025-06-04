document.addEventListener('DOMContentLoaded', function() {
    // Mock data for demonstration (Replace this with actual data fetching logic)
    const userProfileData = {
        name: "John Doe",
        email: "john.doe@example.com",
        jobExperience: "5 years",
        graduatedYear: "2019",
        skills: "JavaScript, HTML, CSS",
        resume: "resume.pdf",
        image: "profile.jpg"
    };

    // Elements
    const profileContainer = document.querySelector('.profile-container');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const profileImage = document.getElementById('profile-image');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const jobExperienceInput = document.getElementById('job-experience');
    const graduatedYearInput = document.getElementById('graduated-year');
    const skillsInput = document.getElementById('skills');
    const resumeInput = document.getElementById('resume');
    const resumeLink = document.getElementById('resume-link');

    // Function to populate profile with data
    function populateProfile() {
        profileImage.src = `../images/${userProfileData.image}`;
        nameInput.value = userProfileData.name;
        emailInput.value = userProfileData.email;
        jobExperienceInput.value = userProfileData.jobExperience;
        graduatedYearInput.value = userProfileData.graduatedYear;
        skillsInput.value = userProfileData.skills;
        resumeLink.href = `../files/${userProfileData.resume}`;
        resumeLink.textContent = userProfileData.resume;
    }

    // Function to toggle between edit and view modes
    function toggleEditMode() {
        const isEditing = profileContainer.classList.toggle('editing');
        nameInput.disabled = !isEditing;
        emailInput.disabled = !isEditing;
        jobExperienceInput.disabled = !isEditing;
        graduatedYearInput.disabled = !isEditing;
        skillsInput.disabled = !isEditing;
        resumeInput.disabled = !isEditing;

        if (isEditing) {
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
        } else {
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
        }
    }

    // Save profile data and redirect to dashboard
    function saveProfile() {
        userProfileData.name = nameInput.value;
        userProfileData.email = emailInput.value;
        userProfileData.jobExperience = jobExperienceInput.value;
        userProfileData.graduatedYear = graduatedYearInput.value;
        userProfileData.skills = skillsInput.value;
        // Note: Handling file upload for resume is not included in this example

        toggleEditMode();
        alert('Profile updated successfully!');
        // Redirect to the dashboard after profile update
        window.location.href = '../html/dashboard.html';
    }

    // Event listeners
    editBtn.addEventListener('click', toggleEditMode);
    saveBtn.addEventListener('click', saveProfile);

    // Initial population of profile data
    populateProfile();
});
