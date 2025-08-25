// ========== SCRIPT.JS - SISTEMA GLOBAL ==========

// Namespace para evitar conflitos
const GlobalSystem = {
    // Variáveis do confetti de contato
    confettiInterval: null,
    confettiCtx: null,
    confettiParticles: [],

    // Função de range aleatório
    randomRange: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Construtor de partículas de confetti
    ConfettiParticle: function(x, y, r, d, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.d = d;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
        this.tiltAngle = 0;

        this.draw = function(ctx) {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            ctx.stroke();
        };

        this.update = function() {
            this.tiltAngle += this.tiltAngleIncremental;
            this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
            this.x += Math.sin(this.d);
            this.tilt = Math.sin(this.tiltAngle) * 15;

            if (this.y > window.innerHeight) {
                this.x = GlobalSystem.randomRange(0, window.innerWidth);
                this.y = -10;
                this.tilt = Math.floor(Math.random() * 10) - 10;
            }
        };
    },

    // Iniciar confetti de contato
    startContactConfetti: function(canvas) {
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.confettiCtx = canvas.getContext("2d");
        this.confettiParticles = [];

        const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800"];

        for (let i = 0; i < 150; i++) {
            this.confettiParticles.push(new this.ConfettiParticle(
                this.randomRange(0, window.innerWidth), 
                this.randomRange(-window.innerHeight, 0), 
                this.randomRange(5, 10), 
                this.randomRange(0, 2 * Math.PI), 
                colors[Math.floor(Math.random() * colors.length)]
            ));
        }

        this.confettiInterval = setInterval(() => {
            this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.confettiParticles.forEach(p => {
                p.update();
                p.draw(this.confettiCtx);
            });
        }, 20);
    },

    // Parar confetti de contato
    stopContactConfetti: function() {
        if(this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
        }
        if(this.confettiCtx){
            this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    },

    // Mostrar texto de hover
    showHoverText: function(button) {
        if (button.innerText === "Fale comigo agora 📲") {
            button.innerText = "Meu telegram";
        } else if (button.innerText === "Me mande um e-mail" || button.innerText === "Obrigada pelo seu contato!") {
            button.innerText = "Clique para abrir";
        }
    },

    // Restaurar texto original
    restoreOriginalText: function(button) {
        if (button.innerText === "Meu telegram") {
            button.innerText = "Fale comigo agora 📲";
        } else if (button.innerText === "Clique para abrir") {
            button.innerText = "Me mande um e-mail";
        }
    },

    // Abrir Telegram
    openTelegram: function(button) {
        window.location.href = "https://t.me/cintiahills";
        button.innerText = "Obrigada pelo seu contato!";
        this.showThankYouMessage(button);
    },

    // Abrir cliente de email
    openMailClient: function(button) {
        window.location.href = "mailto:cintiahills@gmail.com";
        button.innerText = "Obrigada pelo seu contato!";
        this.showThankYouMessage(button);
    },

    // Mostrar mensagem de agradecimento
    showThankYouMessage: function(button) {
        const messageDiv = document.getElementById("thankYouMessage");
        const canvas = document.getElementById("confettiCanvas");
        
        if (messageDiv) {
            messageDiv.style.display = "block";
        }
        
        if (canvas) {
            this.startContactConfetti(canvas);
        }

        setTimeout(() => {
            if (messageDiv) {
                messageDiv.style.display = "none";
            }
            this.stopContactConfetti();
            // Voltar texto original do botão depois do tempo
            button.innerText = "Me mande um e-mail";
        }, 4000);
    },

    // Sistema de menu mobile
    initMobileMenu: function() {
        // Função para criar menu hamburguer se não existir
        const createMobileMenu = () => {
            const header = document.querySelector('.header');
            if (!header) return;
            
            // Verifica se já existe menu toggle
            let menuToggle = header.querySelector('.menu-toggle');
            
            // Se não existir, cria usando CSS pseudo-element
            if (!menuToggle) {
                // Adiciona event listener no clique do header (no pseudo-element ☰)
                header.addEventListener('click', (e) => {
                    // Verifica se clicou na área do menu (lado direito)
                    const rect = header.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const headerWidth = rect.width;
                    
                    // Se clicou nos últimos 80px (área do menu)
                    if (clickX > headerWidth - 80) {
                        this.toggleMobileMenu();
                    }
                });
            }
        };

        // Função específica para certificados (mantém compatibilidade)
        window.toggleMenu = () => {
            const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
            const menuToggle = document.querySelector('.menu-toggle');
            const header = document.querySelector('.header');
            
            if (navbar) {
                navbar.classList.toggle('mobile-active');
                if (header) header.classList.toggle('menu-open');
                if (menuToggle) menuToggle.classList.toggle('active');
            }
        };

        // Correção específica para certificados
        const fixCertificadosMenu = () => {
            // Verifica se estamos na página certificados
            if (document.querySelector('.introduction') && document.querySelector('.journey-section')) {
                const menuToggle = document.querySelector('.menu-toggle');
                const navbar = document.querySelector('.navbar');
                
                if (menuToggle && navbar) {
                    // Força exibição do menu toggle
                    menuToggle.style.display = 'flex';
                    menuToggle.style.flexDirection = 'column';
                    menuToggle.style.cursor = 'pointer';
                    menuToggle.style.padding = '8px';
                    menuToggle.style.background = 'none';
                    menuToggle.style.border = 'none';
                    menuToggle.style.zIndex = '1001';
                    
                    // Garante que o menu toggle funcione
                    menuToggle.onclick = function() {
                        navbar.classList.toggle('mobile-active');
                        menuToggle.classList.toggle('active');
                    };
                    
                    // Estiliza os spans do menu toggle
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.width = '25px';
                        span.style.height = '3px';
                        span.style.background = 'var(--color-primary)';
                        span.style.margin = '3px 0';
                        span.style.transition = '0.3s';
                        span.style.borderRadius = '2px';
                        span.style.display = 'block';
                    });
                }
            }
        };

        // Executa correção para certificados após DOM carregar
        setTimeout(fixCertificadosMenu, 100);
        
        // Fecha menu ao clicar em link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                const header = document.querySelector('.header');
                const navbar = document.querySelector('.navbar');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (header) header.classList.remove('menu-open');
                if (navbar) navbar.classList.remove('mobile-active');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        });
        
        // Fecha menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            const header = document.querySelector('.header');
            const navbar = document.querySelector('.navbar');
            
            if (header && navbar && !header.contains(e.target)) {
                header.classList.remove('menu-open');
                navbar.classList.remove('mobile-active');
                
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
        
        // Inicializa o menu mobile
        createMobileMenu();
        
        // Fecha menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                const header = document.querySelector('.header');
                const navbar = document.querySelector('.navbar');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (header) header.classList.remove('menu-open');
                if (navbar) navbar.classList.remove('mobile-active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    },

    // Alternar menu mobile
    toggleMobileMenu: function() {
        const header = document.querySelector('.header');
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (header && navbar) {
            header.classList.toggle('menu-open');
            
            // Se existe menu toggle físico, anima ele também
            if (menuToggle) {
                menuToggle.classList.toggle('active');
            }
        }
    },

    // Inicializar sistema global
    init: function() {
        this.initMobileMenu();
    }
};

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    GlobalSystem.init();
});

// Expor funções globais para compatibilidade com HTML inline
window.showHoverText = function(button) { GlobalSystem.showHoverText(button); };
window.restoreOriginalText = function(button) { GlobalSystem.restoreOriginalText(button); };
window.openTelegram = function(button) { GlobalSystem.openTelegram(button); };
window.openMailClient = function(button) { GlobalSystem.openMailClient(button); };
window.showThankYouMessage = function(button) { GlobalSystem.showThankYouMessage(button); };
window.startConfetti = function(canvas) { GlobalSystem.startContactConfetti(canvas); };
window.stopConfetti = function() { GlobalSystem.stopContactConfetti(); };