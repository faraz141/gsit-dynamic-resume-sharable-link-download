"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const generateCvButton = document.getElementById('generateCv');
    const shareLinkButton = document.getElementById('shareLink');
    const downloadPdfButton = document.getElementById('downloadPdf');
    // const resumePreview = document.getElementById('resumePreview') as HTMLElement;
    const uniqueLinkDisplay = document.getElementById('uniqueLinkDisplay');
    const addEducationButton = document.getElementById('addEducation');
    const addSkillButton = document.getElementById('addSkills');
    const resumePreview = document.getElementById('resumePreview');
    const educationContainer = document.getElementById('educationContainer');
    const skillsContainer = document.getElementById('skills-container');
    const languagesContainer = document.getElementById('language-container');
    const addLanguageButton = document.getElementById('addLanguages');
    const certificationContainer = document.getElementById('certification-container');
    const addCertificationButton = document.getElementById('addCertification');
    let educationCount = 1;
    let skillCount = 1;
    let languageCount = 1;
    let certificationCount = 1;
    const username = 'sampleUser';
    const uniqueURL = `${username}.vercel.app/resume`;
    // Display the unique link
    // uniqueLinkDisplay.innerHTML = `<a href="https://${uniqueURL}" target="_blank">${uniqueURL}</a>`;
    // Function to copy the link to clipboard
    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(`https://${uniqueURL}`).then(() => alert('Link copied to clipboard!'), () => alert('Failed to copy the link'));
    };
    // Function to generate a unique URL for each resume
    const generateUniqueURL = (username) => {
        const baseUrl = 'https://username.vercel.app/resume/';
        return `${baseUrl}${encodeURIComponent(username)}`;
    };
    // Function to share the unique link
    const shareResumeLink = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Resume link copied to clipboard!');
        });
    };
    // Function to download the resume as PDF
    const downloadResumeAsPDF = () => {
        if (window.html2pdf) {
            const opt = {
                filename: 'resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };
            window
                .html2pdf()
                .from(resumePreview)
                .set(opt) // Set the options here
                .save();
        }
        else {
            console.error('html2pdf library is not loaded');
        }
    };
    generateCvButton.addEventListener('click', () => {
        const username = document.getElementById('resumeName').innerText.trim();
        if (!username) {
            alert('Please enter a name to generate the resume link.');
            return;
        }
        const uniqueURL = generateUniqueURL(username);
        renderResume(uniqueURL); // Passing the unique URL to render the resume
        // Display share and download options
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share Resume';
        shareButton.onclick = () => shareResumeLink(uniqueURL);
        document.body.appendChild(shareButton);
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download as PDF';
        downloadButton.onclick = downloadResumeAsPDF;
        document.body.appendChild(downloadButton);
    });
    const formatDate = (dateString) => {
        if (!dateString)
            return 'N/A';
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31)
            suffix = 'st';
        else if (day === 2 || day === 22)
            suffix = 'nd';
        else if (day === 3 || day === 23)
            suffix = 'rd';
        return `${day}${suffix}-${month}-${year}`;
    };
    const addEducationField = () => {
        educationCount++;
        const newEducationDiv = document.createElement('div');
        newEducationDiv.className = 'education-input';
        newEducationDiv.id = `education${educationCount}`;
        newEducationDiv.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <button type="button" style="background-color: #ff5733; color: white; padding: 10px 20px; margin-right: 10px; margin-left: auto; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.3s;" class="delete-education">Delete<i class="fas fa-trash-alt" style="cursor: pointer; color: #333; margin-left: 10px;"></i></button>
      </div>
      <input type="text" id="school${educationCount}" name="school${educationCount}" placeholder="School " />
      <span class="error" id="school${educationCount}Error" style="display:none;">This field is required.</span>
      <input type="text" id="degree${educationCount}" name="degree${educationCount}" placeholder="Degree" />
      <span class="error" id="degree${educationCount}Error" style="display:none;">This field is required.</span>
      <div class="education-input-date">
        <div class="date-input">
          <input type="date" id="education-start-date${educationCount}" name="education-start-date${educationCount}" placeholder="Starting Date" />
          <span class="error" id="education-start-date${educationCount}Error" style="display:none;">This field is required.</span>
        </div>
        <div class="date-input">
          <input type="date" id="education-ending-date${educationCount}" name="education-ending-date${educationCount}" placeholder="Ending Date" />
          <span class="error" id="education-ending-date${educationCount}Error" style="display:none;">This field is required.</span>
        </div>
      </div>
    `;
        educationContainer.appendChild(newEducationDiv);
        newEducationDiv
            .querySelector('.delete-education')
            ?.addEventListener('click', () => {
            newEducationDiv.remove();
        });
    };
    const addSkillsField = () => {
        skillCount++;
        const newSkillDiv = document.createElement('div');
        newSkillDiv.className = 'skills-input';
        newSkillDiv.id = `skill${skillCount}`;
        newSkillDiv.innerHTML = `
      <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 10px;">
        <input type="text" name="skill${skillCount}" id="skill${skillCount}" placeholder="Enter Your Skill" />
        <i class="fas fa-trash-alt delete-skill" style="cursor: pointer; font-size: 24px; color: #333;"></i>
      </div>
      <span class="error" id="skill${skillCount}Error" style="display:none;">This field is required.</span>
    `;
        skillsContainer.appendChild(newSkillDiv);
        newSkillDiv
            .querySelector('.delete-skill')
            ?.addEventListener('click', () => {
            newSkillDiv.remove();
        });
    };
    const addLanguagesField = () => {
        languageCount++;
        const newLanguageDiv = document.createElement('div');
        newLanguageDiv.className = 'languages-input';
        newLanguageDiv.id = `language${languageCount}`;
        newLanguageDiv.innerHTML = `
      <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 10px;">
        <input type="text" name="language${languageCount}" id="language${languageCount}" placeholder="Enter Your Language" />
        <i class="fas fa-trash-alt delete-language" style="cursor: pointer; font-size: 24px; color: #333;"></i>
      </div>
      <span class="error" id="language${languageCount}Error" style="display:none;">This field is required.</span>
    `;
        languagesContainer.appendChild(newLanguageDiv);
        newLanguageDiv
            .querySelector('.delete-language')
            ?.addEventListener('click', () => {
            newLanguageDiv.remove();
        });
    };
    const addCertificationField = () => {
        certificationCount++;
        const newCertificationDiv = document.createElement('div');
        newCertificationDiv.className = 'certification';
        newCertificationDiv.id = `certification${certificationCount}`;
        newCertificationDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <button type="button" style="background-color: #ff5733; color: white; padding: 10px 20px; margin-right: 10px; margin-left: auto; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.3s;" class="delete-certification">Delete<i class="fas fa-trash-alt" style="cursor: pointer; color: #333; margin-left: 10px;"></i></button>
        </div>
        <div class="certification-input">
          <input type="text" name="Certification-name${certificationCount}" id="certification-name${certificationCount}" placeholder="Certification Name" />
        </div>
        <div class="certification-input">
          <input type="text" name="Organization-name${certificationCount}" id="organization-name${certificationCount}" placeholder="Organization Name" />
        </div>
    `;
        certificationContainer.appendChild(newCertificationDiv);
        newCertificationDiv
            .querySelector('.delete-certification')
            ?.addEventListener('click', () => {
            newCertificationDiv.remove();
        });
    };
    const gatherFormData = (callback) => {
        const photoInput = document.getElementById('photo');
        const file = photoInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result;
                callback(dataUrl);
            };
            reader.readAsDataURL(file);
        }
        else {
            callback('');
        }
    };
    const saveChanges = () => {
        const formData = {
            name: document.getElementById('resumeName').innerText,
            title: document.getElementById('resumeTitle').innerText,
            email: document.getElementById('resumeEmail').innerText,
            contactNo: document.getElementById('resumeContactNo')
                .innerText,
            address: document.getElementById('resumeAddress')
                .innerText,
            summary: document.getElementById('resumeSummary')
                .innerText,
            workExperienceCompanyName: document.getElementById('resumeWorkExperience').innerText.split(',')[0],
            workExperiencePositionName: document.getElementById('resumeWorkExperience').innerText.split(',')[1],
            workExperiencePositionDescription: document.getElementById('resumeWorkDescription').innerText,
            workExperienceCompanyDescription: document.getElementById('resumeCompanyDescription').innerText,
            education: Array.from(document.getElementById('education')?.children || []).map((eduDiv) => {
                const eduElement = eduDiv;
                return {
                    school: eduElement.innerText.split('<br/>')[0].trim(),
                    degree: eduElement.innerText.split('<br/>')[1].trim(),
                    startDate: eduElement.innerText.split('<br/>')[2].trim(),
                    endDate: eduElement.innerText.split('<br/>')[3].trim(),
                };
            }),
            certification: Array.from(document.getElementById('certifications')?.children || []).map((cerDiv) => {
                const cerElement = cerDiv;
                return {
                    Name: cerElement.innerText.split('<br/>')[0].trim(),
                    Organization: cerElement.innerText.split('<br/>')[1].trim(),
                };
            }),
            skills: Array.from(document.getElementById('skills')?.children || []).map((skillLi) => {
                const skillElement = skillLi;
                return skillElement.innerText;
            }),
            languages: Array.from(document.getElementById('languages')?.children || []).map((languageLi) => {
                const languageElement = languageLi;
                return languageElement.innerText;
            }),
        };
        renderResume(formData);
    };
    const renderResume = (formData) => {
        resumePreview.innerHTML = `
      <div class="resume-container">
        <div class="top">
          <div class="profile-pic">    
              <img src="${formData.photo}" alt="${formData.name}">
          </div>
          <div class="info">
            <h1 contenteditable="true" class="editable" id="resumeName">${formData.name.toUpperCase()}</h1>
            <h2 contenteditable="true" class="editable" id="resumeTitle ">${formData.title}</h2>
            <div class="contact-info">
                 <p contenteditable="true" class="editable" id="resumeEmail"><i class="fas fa-envelope"></i> ${formData.email}</p>
                 <p contenteditable="true" class="editable" id="resumeContactNo"><i class="fas fa-phone"></i> ${formData.contactNo}</p>
                 <p contenteditable="true" class="editable" id="resumeAddress"><i class="fas fa-map-marker-alt"></i> ${formData.address}</p>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="left">
          <h3>Certifications</h3>
            <div id="certifications">
              ${formData.certification
            .map((cer) => `<p contenteditable="true" class="editable"><strong>${cer.Name}</strong><br/>${cer.Organization}</p>`)
            .join('')}
            </div>
            
            <h3>Skills</h3>
            <ul id="skills">
              ${formData.skills
            .map((skill) => `<li contenteditable="true" class="editable">${skill}</li>`)
            .join('')}
            </ul>
            <h3>Languages</h3>
            <ul id="languages">
              ${formData.languages
            .map((language) => `<li contenteditable="true" class="editable">${language}</li>`)
            .join('')}
            </ul>
          </div>
          <div class="right">
          <h3>Summary</h3>
            <p contenteditable="true" class="editable" id="resumeSummary">${formData.summary}</p>
            <h3>Work Experience</h3>
            <p contenteditable="true" class="editable" id="resumeWorkExperience">${formData.workExperienceCompanyName}, ${formData.workExperiencePositionName} (${formatDate(formData.WorkStartDate)} - ${formatDate(formData.workEndingDate)})</p>
            <p contenteditable="true" class="editable" id="resumeWorkDescription">${formData.workExperiencePositionDescription}</p>
            <p contenteditable="true" class="editable" id="resumeCompanyDescription">${formData.workExperienceCompanyDescription}</p>
            
            <h3> Education</h3>
            <div id="education">
              ${formData.education
            .map((edu) => `<p contenteditable="true" class="editable"><strong>${edu.school}</strong><br/>Degree: ${edu.degree}<br/>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>`)
            .join('')}
            </div>
          </div>
        </div>
      </div>
    `;
        // Add event listener for the save changes button
        document
            .getElementById('saveChanges')
            ?.addEventListener('click', saveChanges);
    };
    generateCvButton.addEventListener('click', () => {
        hideErrors();
        gatherFormData((photoDataUrl) => {
            const certificationData = Array.from(certificationContainer.querySelectorAll('.certification')).map((cerDiv) => ({
                Name: cerDiv.querySelector('input[name^="Certification-name"]')?.value,
                Organization: cerDiv.querySelector('input[name^="Organization-name"]')?.value,
            }));
            const educationData = [
                // Include the initial education input here
                {
                    school: document.getElementById('school')
                        ?.value,
                    degree: document.getElementById('degree')
                        ?.value,
                    startDate: document.getElementById('education-start-date')?.value,
                    endDate: document.getElementById('education-ending-date')?.value,
                },
            ];
            educationData.push(...Array.from(educationContainer.querySelectorAll('.education-input')).map((eduDiv) => ({
                school: eduDiv.querySelector('input[name^="school"]')?.value,
                degree: eduDiv.querySelector('input[name^="degree"]')?.value,
                startDate: eduDiv.querySelector('input[name^="education-start-date"]')?.value,
                endDate: eduDiv.querySelector('input[name^="education-ending-date"]')?.value,
            })));
            const skillData = Array.from(skillsContainer.querySelectorAll('.skills-input')).map((skillDiv) => ({
                skill: skillDiv.querySelector('input[name^="skill"]')?.value,
            }));
            const languageData = Array.from(languagesContainer.querySelectorAll('.languages-input')).map((languageDiv) => ({
                language: languageDiv.querySelector('input[name^="language"]')?.value,
            }));
            const formData = {
                name: document.getElementById('name').value,
                title: document.getElementById('title').value,
                email: document.getElementById('email').value,
                contactNo: document.getElementById('contactNo')
                    .value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                summary: document.getElementById('summary')
                    .value,
                education: educationData,
                workExperienceCompanyDescription: document.getElementById('company-description').value,
                workExperienceCompanyName: document.getElementById('company-name').value,
                workExperiencePositionName: document.getElementById('position').value,
                workExperiencePositionDescription: document.getElementById('position-description').value,
                WorkStartDate: document.getElementById('work-start-date').value,
                workEndingDate: document.getElementById('work-ending-date').value,
                certification: certificationData,
                skills: skillData.map((s) => s.skill),
                languages: languageData.map((l) => l.language),
                photo: photoDataUrl, // Pass the data URL here
            };
            const errors = validateForm(formData);
            if (errors.length > 0) {
                displayErrors(errors);
                return;
            }
            renderResume(formData);
        });
    });
    addEducationButton.addEventListener('click', addEducationField);
    addSkillButton.addEventListener('click', addSkillsField);
    addLanguageButton.addEventListener('click', addLanguagesField);
    addCertificationButton.addEventListener('click', addCertificationField);
    downloadPdfButton.addEventListener('click', downloadResumeAsPDF);
    shareLinkButton.addEventListener('click', copyLinkToClipboard);
    const validateForm = (data) => {
        const errors = [];
        for (const field in data) {
            if (Array.isArray(data[field])) {
                data[field].forEach((value, idx) => {
                    if (!value)
                        errors.push({ field: `${field}${idx + 1}` });
                });
            }
            else if (data[field] === '') {
                errors.push({ field });
            }
        }
        return errors;
    };
    const displayErrors = (errors) => {
        errors.forEach((error) => {
            const errorField = document.getElementById(`${error.field}Error`);
            if (errorField) {
                errorField.style.display = 'inline';
            }
        });
    };
    const hideErrors = () => {
        document.querySelectorAll('.error').forEach((el) => {
            el.style.display = 'none';
        });
    };
});
