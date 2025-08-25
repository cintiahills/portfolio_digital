// ========== PROJETO DETALHE JS ==========

// Função para voltar à página anterior
function goBack() {
    window.history.back();
}

// Sistema de menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.navbar a');

    if (menuToggle && navbar) {
        // Toggle do menu mobile
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            const header = document.querySelector('.header');
            if (header && !header.contains(e.target)) {
                navbar.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            }
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navbar.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Carregamento do conteúdo do projeto
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

    // Inicializar menu mobile após carregamento
    initMobileMenu();
};