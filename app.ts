declare const html2pdf: any;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resumeForm') as HTMLFormElement;
  const generateCvButton = document.getElementById(
    'generateCv',
  ) as HTMLButtonElement;
  const resumePreview = document.getElementById(
    'resumePreview',
  ) as HTMLDivElement;
  const saveChangesButton = document.getElementById(
    'saveChangesButton',
  ) as HTMLButtonElement;
  const shareableLinkSection = document.getElementById(
    'shareableLinkSection',
  ) as HTMLDivElement;
  const shareableLink = document.getElementById(
    'shareableLink',
  ) as HTMLParagraphElement;
  const downloadPdfButton = document.getElementById(
    'downloadPdfButton',
  ) as HTMLButtonElement;

  // Event listener for generating the CV
  generateCvButton.addEventListener('click', () => {
    if (form.checkValidity()) {
      const formData: ResumeFormData = {
        username: (document.getElementById('username') as HTMLInputElement)
          .value,
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        contactNo: (document.getElementById('contactNo') as HTMLInputElement)
          .value,
        dob: (document.getElementById('dob') as HTMLInputElement).value,
        nationality: (
          document.getElementById('nationality') as HTMLInputElement
        ).value,
        education: (document.getElementById('education') as HTMLTextAreaElement)
          .value,
        workExperience: (
          document.getElementById('workExperience') as HTMLTextAreaElement
        ).value,
        skills: (document.getElementById('skills') as HTMLTextAreaElement)
          .value,
      };
      updateResumePreview(formData);
      generateShareableLink(formData.username); // Generate shareable link based on username
    } else {
      form.reportValidity();
    }
  });

  // Function to update the resume preview and make sections editable
  function updateResumePreview(formData: ResumeFormData) {
    resumePreview.innerHTML = `
            <div class="resumeContent">
                <h2 contenteditable="true" id="editableName">${
                  formData.name
                }</h2>
                <p><strong>Email:</strong> <span contenteditable="true" id="editableEmail">${
                  formData.email
                }</span></p>
                <p><strong>Contact Number:</strong> <span contenteditable="true" id="editableContactNo">${
                  formData.contactNo
                }</span></p>
                <p><strong>Date of Birth:</strong> <span contenteditable="true" id="editableDob">${new Date(
                  formData.dob,
                ).toLocaleDateString()}</span></p>
                <p><strong>Nationality:</strong> <span contenteditable="true" id="editableNationality">${
                  formData.nationality
                }</span></p>
                <h3>Education</h3>
                <p contenteditable="true" id="editableEducation">${
                  formData.education
                }</p>
                <h3>Work Experience</h3>
                <p contenteditable="true" id="editableWorkExperience">${
                  formData.workExperience
                }</p>
                <h3>Skills</h3>
                <p contenteditable="true" id="editableSkills">${
                  formData.skills
                }</p>
            </div>
        `;
    resumePreview.style.display = 'block'; // Show the resume preview
    saveChangesButton.style.display = 'block'; // Show the save changes button
    shareableLinkSection.style.display = 'block'; // Show the shareable link and download button
  }

  // Event listener for saving the changes
  saveChangesButton.addEventListener('click', () => {
    const updatedFormData: ResumeFormData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      name: (document.getElementById('editableName') as HTMLElement).innerText,
      email: (document.getElementById('editableEmail') as HTMLElement)
        .innerText,
      contactNo: (document.getElementById('editableContactNo') as HTMLElement)
        .innerText,
      dob: (document.getElementById('editableDob') as HTMLElement).innerText,
      nationality: (
        document.getElementById('editableNationality') as HTMLElement
      ).innerText,
      education: (document.getElementById('editableEducation') as HTMLElement)
        .innerText,
      workExperience: (
        document.getElementById('editableWorkExperience') as HTMLElement
      ).innerText,
      skills: (document.getElementById('editableSkills') as HTMLElement)
        .innerText,
    };

    console.log('Updated Resume Data: ', updatedFormData);

    alert('Changes saved successfully!');
  });

  // Function to generate a unique shareable link
  function generateShareableLink(username: string) {
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

// Define ResumeFormData interface
interface ResumeFormData {
  username: string;
  name: string;
  email: string;
  contactNo: string;
  dob: string;
  nationality: string;
  education: string;
  workExperience: string;
  skills: string;
}
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const match = path.match(/\/resume\/(.+)/);
  if (match) {
    const username = match[1];
    // Fetch and display resume based on the username
    fetchResumeByUsername(username);
  }
});

function fetchResumeByUsername(username: string) {
  // Replace this with actual logic to fetch and display resume data
  console.log(`Fetching resume for username: ${username}`);
  // Example:
  // Fetch resume data from a backend or local storage
  // Display the fetched resume data in the #resumePreview element
}
