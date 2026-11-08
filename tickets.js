
document.addEventListener('DOMContentLoaded', () => {

    const storedData = sessionStorage.getItem('ticketData');

    if (!storedData) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(storedData);


    document.getElementById('serialTracker').textContent = user.serial;
    document.getElementById('ticketName').textContent = user.fullName;
    document.getElementById('confirmationEmail').textContent = user.email;

    const githubLink = document.getElementById('ticketGithub');

    githubLink.textContent = user.github;
    githubLink.href = `https://github.com/${user.github.replace('@', '')}`;

    document.getElementById('ticketAvatar').src = user.avatar;

});
