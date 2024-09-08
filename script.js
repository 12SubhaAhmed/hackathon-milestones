var _a;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get form elements
    var profileInput = document.getElementById('profilePic');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillElement = document.getElementById('skills');
    var usernameElement = document.getElementById('cvname');
    if (profileInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillElement.value;
        var username = usernameElement.value;
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // Handle profile picture
        var profilePicFile = (_a = profileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePicUrl = profilePicFile ? URL.createObjectURL(profilePicFile) : "";
        // Create resume output
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(profilePicUrl ? "<img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\" class=\"profilePic\">") : '', " \n            <p><strong><h4>Name:</h4></strong> <span id=\"editName\" class=\"editable\">").concat(name_1, "</span></p><hr><br>\n            <p><strong><h4>Email:</h4></strong> <span id=\"editEmail\" class=\"editable\">").concat(email, "</span></p><hr><br>\n            <p><strong><h4>Phone Number:</h4></strong> <span id=\"editPhone\" class=\"editable\">").concat(phone, "</span></p><hr><br>\n            <h3>Education</h3>\n            <p id=\"editEducation\" class=\"editable\">").concat(education, "</p><hr><br>\n            <h3>Experience</h3>\n            <p id=\"editExperience\" class=\"editable\">").concat(experience, "</p><hr><br>\n            <h3>Skills</h3>\n            <p id=\"editSkills\" class=\"editable\">").concat(skills, "</p><hr><br>\n        ");
        // Create download link
        var dwnldLink = document.createElement('a');
        dwnldLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        dwnldLink.download = uniquePath;
        dwnldLink.textContent = 'Download your resume here';
        // Output resume
        var resumeOutputElement = document.getElementById('resume_output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(dwnldLink);
            makeEditable();
        }
        else {
            console.error('Resume output element is missing');
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
