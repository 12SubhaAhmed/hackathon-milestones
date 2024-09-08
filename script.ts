document.getElementById("resumeForm")?.addEventListener('submit', function(event){
    event.preventDefault();

    // Get form elements
    const profileInput = document.getElementById('profilePic') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillElement = document.getElementById('skills') as HTMLTextAreaElement;
    const usernameElement = document.getElementById('cvname') as HTMLInputElement;

    if (profileInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillElement.value;
        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        // Handle profile picture
        const profilePicFile = profileInput.files?.[0];
        const profilePicUrl = profilePicFile ? URL.createObjectURL(profilePicFile) : "";

        // Create resume output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture" class="profilePic">` : ''} 
            <p><strong><h4>Name:</h4></strong> <span id="editName" class="editable">${name}</span></p><hr><br>
            <p><strong><h4>Email:</h4></strong> <span id="editEmail" class="editable">${email}</span></p><hr><br>
            <p><strong><h4>Phone Number:</h4></strong> <span id="editPhone" class="editable">${phone}</span></p><hr><br>
            <h3>Education</h3>
            <p id="editEducation" class="editable">${education}</p><hr><br>
            <h3>Experience</h3>
            <p id="editExperience" class="editable">${experience}</p><hr><br>
            <h3>Skills</h3>
            <p id="editSkills" class="editable">${skills}</p><hr><br>
        `;

        // Create download link
        const dwnldLink = document.createElement('a');
        dwnldLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        dwnldLink.download = uniquePath;
        dwnldLink.textContent = 'Download your resume here';

        // Output resume
        const resumeOutputElement = document.getElementById('resume_output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(dwnldLink);
            makeEditable();
        } else {
            console.error('Resume output element is missing');
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
