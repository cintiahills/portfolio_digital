
function goBack() {
    window.history.back();
}

window.onload = function () {
const content = document.getElementById('project-content');
const project = JSON.parse(localStorage.getItem('project'));

 if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-image').src = project.url;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('additionalInfo').textContent = project.additionalInfo;
        document.getElementById('date').textContent = project.date;
        document.getElementById('launch-site').href = project.site; 
}

    setTimeout(() => {
    content.classList.add('visible');
}, 1500);
};
