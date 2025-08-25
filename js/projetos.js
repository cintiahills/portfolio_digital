


const projects = [
    {
        url: "images/callidus.png",
        title: "Callidus3.0",
        nome_logo: "callidus.jpg",
        description:"Uma versão demo do site da Callidus, criada para aprender, usar e explorar os fundamentos de HTML, CSS e JS.",
        logo: "images/callidus.jpg",
        additionalInfo: "Projeto demo Callidus 3.0",
        date: "10-02-2025",
        site:"https://cintiahills.github.io/Callidus_demo/"
    },
    {
        url: "images/graodareia.png",
        title: "Restaurante Grão d'areia",
        nome_logo: "graodareia.jpg",
        description: "Página web para o restaurante Grão d'areia. Desenvolvi o front-end em Python em conjunto com minha colega de curso Filipa Ferreira, que construiu o Backend.",
        logo: "images/graodareia.jpg",
        additionalInfo: "Desenvolvido com Flask e integração de Jinja para o backend. ⚠️ Devido ao uso do Render, o carregamento da pagina pode demorar de 1 a 3 minutos.",
        date: "13-12-2024",
        site:"https://graodareia.onrender.com/"
    },
    {
        url: "images/ferrari.png",
        title: "Ferrari",
        nome_logo: "ferrari.jpg",
        description: "Meu professor nos desafiou a projetar um site existente. Eu escolhi o site da Ferrari como projeto de classe, criando uma das minhas primeiras páginas web estáticas.",
        logo: "images/ferrari.jpg",
        additionalInfo: "Uma Criação minha para o site da Ferrari.",
        date: "15-07-2024",
        site:"https://cintiahills.github.io/ferrari/"
    },
    {
        url: "images/anio.png",
        title: "The Anio of Anotusy",
        nome_logo: "anio.jpg",
        description: "Uma landing page para o lançamento do livro fictício 'The Anio of Anotusy', criada para aprimorar habilidades em HTML e CSS, com foco no design visual e em interfaces responsivas. Um dos meus primeiros projetos, explorando layout, tipografia e estética digital através do CSS.",
        logo: "images/anio.jpg",
        additionalInfo: "Landing page para lançamento de livro fictício, em HTML e CSS",
        date: "03-06-2024",
        site:"https://cintiahills.github.io/StaticbookstoreProject/"
    },
    {
        url: "images/canarite.png",
        title: "Canarité",
        nome_logo: "canarite.jpg",
        description: "Página web para Loja de camisetas localizada em Gran Canária chamada Canarité. Trabalho desenvolvido em PHP.",
        logo: "images/canarite.jpg",
        additionalInfo: "Desenvolvimento voltado para e-commerce com PHP e MySQL.",
        date: "22-11-2024",
        site:"https://github.com/cintiahills/canarite_demo?tab=readme-ov-file"
    },
    {
        url: "images/25abril.png",
        title: "25 de Abril, sempre!",
        nome_logo: "25abril.jpg",
        description: "Uma das primeiras páginas que criei: uma página estática para comemorar o 25 de Abril em Portugal, com um botão puramente ilustrativo levando a um formulário para perguntas sobre o evento.",
        logo: "images/25abril.jpg",
        additionalInfo: "Projeto simples para formulário especial comemorativo de 25 de Abril.",
        date: "20-04-2024",
        site:"https://cintiahills.github.io/25ofApril/"
    },
    {
        url: "images/breve.png",  
        title: "em construção...",
        nome_logo: "breve.jpg", 
        description: "Novos projetos incríveis estão a caminho!...",
        logo: "images/breve.jpg",
        additionalInfo: "Estamos sempre trabalhando...",
        date: "Em breve",
        site:"projetos.html"
    }
];

// Objeto com ícones de tecnologias
const techIcons = {
    html: '<img src="icons/html-5.png" alt="HTML" class="tech-icon" loading="lazy">',
    css: '<img src="icons/css-3.png" alt="CSS" class="tech-icon" loading="lazy">',
    js: '<img src="icons/java-script.png" alt="JavaScript" class="tech-icon" loading="lazy">',
    php: '<img src="icons/php.png" alt="PHP" class="tech-icon" loading="lazy">',
    python: '<img src="icons/python.png" alt="Python" class="tech-icon" loading="lazy">'
};

function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    // Criar imagem principal com lazy loading
    const img = document.createElement('img');
    // Usar o nome_logo para criar o caminho da imagem PNG
    const pngUrl = project.nome_logo ? `images/${project.nome_logo.replace('.jpg', '.png')}` : 'images/placeholder.png';
    img.src = pngUrl;
    img.alt = project.title;
    img.loading = "lazy";
    img.classList.add('project-image');
    img.onerror = () => {
        console.error(`Failed to load image: ${pngUrl}`);
        img.src = 'images/placeholder.png';
    };

    // Criar logo com lazy loading
    const logo = document.createElement('img');
    if (project.logo) {
        logo.src = project.logo;
        logo.alt = `${project.title} Logo`;
        logo.loading = "lazy";
        logo.classList.add('project-logo');
        logo.onerror = () => {
            logo.style.display = 'none';
        };
    }

    // Criar div de informações
    const info = document.createElement('div');
    info.classList.add('project-info');

    // Criar título
    const title = document.createElement('h3');
    title.classList.add('project-title');
    title.textContent = project.title;

    // Criar botão "Saber mais"
    const saberMais = document.createElement('div');
    saberMais.classList.add('saber-mais');
    saberMais.textContent = project.title === "em construção..." ? "Projeto em construção" : "Saber mais";

    // Criar div de tecnologias
    const tech = document.createElement('div');
    tech.classList.add('project-tech');

    // Adicionar ícones de tecnologia baseado no projeto
    if (project.title === "Restaurante Grão d'areia") {
        tech.innerHTML = `${techIcons.html}${techIcons.css}${techIcons.python}`;
    } else if (project.title === "Canarité") {
        tech.innerHTML = `${techIcons.html}${techIcons.css}${techIcons.js}${techIcons.php}`;
    } else if (project.title === "em construção...") {
        title.innerHTML = "";
        tech.innerHTML = "";
        if (logo) logo.style.display = "none";
    } else if (project.title === "The Anio of Anotusy") {
        tech.innerHTML = `${techIcons.html}${techIcons.css}`;
    } else {
        tech.innerHTML = `${techIcons.html}${techIcons.css}${techIcons.js}`;
    }

    // Montar a estrutura do card
    info.appendChild(title);
    info.appendChild(saberMais);
    info.appendChild(tech);
    projectCard.appendChild(img);
    if (project.logo) projectCard.appendChild(logo);
    projectCard.appendChild(info);

    // Adicionar evento de clique
    projectCard.addEventListener('click', () => {
        if (project.url && project.url.startsWith('http')) {
            window.location.href = project.url; // Navega para o site do projeto
        } else {
            localStorage.setItem('project', JSON.stringify(project));
            window.location.href = "projeto_detalhe.html";
        }
    });

    return projectCard;
}
// Função para inicializar a galeria
function initializeGallery() {
    const gallery = document.getElementById('projectsGrid');
    if (!gallery) return;

    // Limpar galeria existente
    gallery.innerHTML = '';

    // Adicionar cards de projeto
    projects.forEach(project => {
        const card = createProjectCard(project);
        gallery.appendChild(card);
    });
}

// Inicializar a galeria quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeGallery);