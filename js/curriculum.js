// ========== CURRICULUM.JS - SISTEMA DE DOWNLOAD ==========

// Namespace para evitar conflitos
const CurriculumDownload = {
    // Animação Lottie
    initLottie: function() {
        if (document.getElementById('lottie-animation')) {
            const animation = lottie.loadAnimation({
                container: document.getElementById('lottie-animation'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://lottie.host/95c5c3ce-e09a-4890-ac83-97434fb5e57f/9SXiI7T2C1.json'
            });
        }
    },

    // Variáveis do confetti
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
                this.x = CurriculumDownload.randomRange(0, window.innerWidth);
                this.y = -10;
                this.tilt = Math.floor(Math.random() * 10) - 10;
            }
        };
    },

    // Iniciar confetti de download
    startDownloadConfetti: function() {
        // Criar canvas se não existir
        let canvas = document.getElementById('downloadConfettiCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'downloadConfettiCanvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9999';
            document.body.appendChild(canvas);
        }

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

    // Parar confetti de download
    stopDownloadConfetti: function() {
        if(this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
        }
        if(this.confettiCtx){
            this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        // Remove canvas após usar
        const canvas = document.getElementById('downloadConfettiCanvas');
        if(canvas) {
            canvas.remove();
        }
    },

    // Mostrar mensagem de sucesso
    showDownloadSuccess: function() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.opacity = '1';
            
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);
            }, 3000);
        }
    },

    // Inicializar sistema de download
    init: function() {
        this.initLottie();

        const mainButton = document.querySelector('.download-button');
        const buttonText = document.getElementById('buttonText');
        const languageOptions = document.getElementById('languageOptions');

        if (!mainButton || !buttonText || !languageOptions) {
            return; // Se elementos não existem, não faz nada
        }

        mainButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!languageOptions.classList.contains('show')) {
                languageOptions.classList.add('show');
                buttonText.textContent = 'Clique no idioma selecionado abaixo';
            }
        });

        mainButton.addEventListener('mouseenter', () => {
            if (languageOptions.classList.contains('show')) {
                buttonText.textContent = '👇🏽';
            }
        });

        mainButton.addEventListener('mouseleave', () => {
            if (languageOptions.classList.contains('show')) {
                buttonText.textContent = 'Clique no idioma selecionado abaixo';
            }
        });

        const optionButtons = document.querySelectorAll('.language-option');

        optionButtons.forEach(button => {
            button.dataset.originalText = button.textContent;

            button.addEventListener('mouseenter', () => {
                button.textContent = '🥳';
            });
            
            button.addEventListener('mouseleave', () => {
                button.textContent = button.dataset.originalText;
            });

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = button.getAttribute('data-lang');
                buttonText.textContent = 'Baixando...';

                languageOptions.classList.remove('show');

                let filePath = '';
                switch (lang) {
                    case 'pt':
                        filePath = 'documents/pt_Cintia.pdf';
                        break;
                    case 'en':
                        filePath = 'documents/en_Cintia.pdf';
                        break;
                    case 'es':
                        filePath = 'documents/es_Cintia.pdf';
                        break;
                    case 'it':
                        filePath = 'documents/it_Cintia.pdf';
                        break;
                    default:
                        filePath = 'documents/pt_Cintia.pdf';
                }

                // 🎉 CONFETTI CELEBRATION! 🎉
                this.startDownloadConfetti();
                this.showDownloadSuccess();
                
                window.open(filePath, '_blank');

                // Parar confetti após 4 segundos
                setTimeout(() => {
                    this.stopDownloadConfetti();
                }, 4000);

                setTimeout(() => {
                    buttonText.textContent = 'Clique para selecionar idioma';
                }, 3000);
            });
        });
    }
};

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    CurriculumDownload.init();
});

// Para compatibilidade, expor funções globais se necessário
window.startDownloadConfetti = function() { CurriculumDownload.startDownloadConfetti(); };
window.stopDownloadConfetti = function() { CurriculumDownload.stopDownloadConfetti(); };
window.showDownloadSuccess = function() { CurriculumDownload.showDownloadSuccess(); };