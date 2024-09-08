"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const generateCvButton = document.getElementById('generateCv');
    const resumePreview = document.getElementById('resumePreview');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const shareableLinkSection = document.getElementById('shareableLinkSection');
    const shareableLink = document.getElementById('shareableLink');
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    // Event listener for generating the CV
    generateCvButton.addEventListener('click', () => {
        if (form.checkValidity()) {
            const formData = {
                username: document.getElementById('username')
                    .value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                contactNo: document.getElementById('contactNo')
                    .value,
                dob: document.getElementById('dob').value,
                nationality: document.getElementById('nationality').value,
                education: document.getElementById('education')
                    .value,
                workExperience: document.getElementById('workExperience').value,
                skills: document.getElementById('skills')
                    .value,
            };
            updateResumePreview(formData);
            generateShareableLink(formData.username); // Generate shareable link based on username
        }
        else {
            form.reportValidity();
        }
    });
    // Function to update the resume preview and make sections editable
    function updateResumePreview(formData) {
        resumePreview.innerHTML = `
            <div class="resumeContent">
                <h2 contenteditable="true" id="editableName">${formData.name}</h2>
                <p><strong>Email:</strong> <span contenteditable="true" id="editableEmail">${formData.email}</span></p>
                <p><strong>Contact Number:</strong> <span contenteditable="true" id="editableContactNo">${formData.contactNo}</span></p>
                <p><strong>Date of Birth:</strong> <span contenteditable="true" id="editableDob">${new Date(formData.dob).toLocaleDateString()}</span></p>
                <p><strong>Nationality:</strong> <span contenteditable="true" id="editableNationality">${formData.nationality}</span></p>
                <h3>Education</h3>
                <p contenteditable="true" id="editableEducation">${formData.education}</p>
                <h3>Work Experience</h3>
                <p contenteditable="true" id="editableWorkExperience">${formData.workExperience}</p>
                <h3>Skills</h3>
                <p contenteditable="true" id="editableSkills">${formData.skills}</p>
            </div>
        `;
        resumePreview.style.display = 'block'; // Show the resume preview
        saveChangesButton.style.display = 'block'; // Show the save changes button
        shareableLinkSection.style.display = 'block'; // Show the shareable link and download button
    }
    // Event listener for saving the changes
    saveChangesButton.addEventListener('click', () => {
        const updatedFormData = {
            username: document.getElementById('username').value,
            name: document.getElementById('editableName').innerText,
            email: document.getElementById('editableEmail')
                .innerText,
            contactNo: document.getElementById('editableContactNo')
                .innerText,
            dob: document.getElementById('editableDob').innerText,
            nationality: document.getElementById('editableNationality').innerText,
            education: document.getElementById('editableEducation')
                .innerText,
            workExperience: document.getElementById('editableWorkExperience').innerText,
            skills: document.getElementById('editableSkills')
                .innerText,
        };
        console.log('Updated Resume Data: ', updatedFormData);
        alert('Changes saved successfully!');
    });
    // Function to generate a unique shareable link
    function generateShareableLink(username) {
        const baseUrl = window.location.origin;
        const resumeUrl = `${baseUrl}/resume/${username}`;
        shareableLink.innerHTML = `Shareable Link: <a href="${resumeUrl}" target="_blank">${resumeUrl}</a>`;
    }
    // Event listener for downloading the resume as PDF
    downloadPdfButton.addEventListener('click', () => {
        const resumeContent = document.getElementById('resumePreview');
        if (resumeContent) {
            html2pdf().from(resumeContent).save();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const match = path.match(/\/resume\/(.+)/);
    if (match) {
        const username = match[1];
        // Fetch and display resume based on the username
        fetchResumeByUsername(username);
    }
});
function fetchResumeByUsername(username) {
    // Replace this with actual logic to fetch and display resume data
    console.log(`Fetching resume for username: ${username}`);
    // Example:
    // Fetch resume data from a backend or local storage
    // Display the fetched resume data in the #resumePreview element
}
