
document.addEventListener('DOMContentLoaded', () => {

    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();

            //Get the form fields using your HTML IDs
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const github = document.getElementById('github').value.trim();
            const avatarFile = document.getElementById('avatar').files[0];

            //Get the error message elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const githubError = document.getElementById('githubError');
            const avatarError = document.getElementById('avatarError');

            //Clear previous error messages
            nameError.textContent = '';
            emailError.textContent = '';
            githubError.textContent = '';
            avatarError.textContent = '';

            let valid = true;

            //Validate full name
            if (fullname === '') {
                nameError.textContent = 'Please enter your full name.';
                valid = false;
            }

            //Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                emailError.textContent = 'Please enter a valid email address.';
                valid = false;
            }

            //Validate GitHub username
            if (!/^@[a-zA-Z0-9-]+$/.test(github)) {
                githubError.textContent = 'GitHub username must begin with @.';
                valid = false;
            }

            //Validate avatar
            if (!avatarFile) {
                avatarError.textContent = 'Please upload an avatar.';
                valid = false;
            } else {
                const allowedTypes = ['image/jpeg', 'image/png'];

                if (!allowedTypes.includes(avatarFile.type)) {
                    avatarError.textContent = 'Only JPEG and PNG images are allowed.';
                    valid = false;
                }

                if (avatarFile.size >= 500 * 1024) {
                    avatarError.textContent = 'Image must be smaller than 500KB.';
                    valid = false;
                }
            }

            //Stop if any validation fails
            if (!valid) {
                return;
            }

            //Read the uploaded avatar
            const reader = new FileReader();

            reader.onload = function () {

                //Store registration information
                const user = {
                    fullName: fullname,
                    email: email,
                    github: github,
                    avatar: reader.result,
                    serialTracker: '#' + Math.floor(10000 + Math.random() * 90000)
                };

                sessionStorage.setItem('ticketData', JSON.stringify(user));

                //Transfer to ticket page
                window.location.href = 'ticket.html';
            };

            reader.readAsDataURL(avatarFile);

        });
    }

});
