function showHoverText(button) {
    if (button.innerText === "Fale comigo agora 📲") {
        button.innerText = "Meu telegram";
    } else if (button.innerText === "Me mande um e-mail" || button.innerText === "Obrigada pelo seu contato!") {
        button.innerText = "Clique para abrir";
    }
}

function restoreOriginalText(button) {
    if (button.innerText === "Meu telegram") {
        button.innerText = "Fale comigo agora 📲";
    } else if (button.innerText === "Clique para abrir") {
        button.innerText = "Me mande um e-mail";
    }
}

function openTelegram(button) {
    window.location.href = "https://t.me/cintiahills";
    button.innerText = "Obrigada pelo seu contato!";
    showThankYouMessage(button);
}


function openMailClient(button) {
    window.location.href = "mailto:cintiahills@gmail.com";
    button.innerText = "Obrigada pelo seu contato!";
    showThankYouMessage(button);
}

// Função que mostra mensagem e animação de confetes
function showThankYouMessage(button) {
    const messageDiv = document.getElementById("thankYouMessage");
    const canvas = document.getElementById("confettiCanvas");
    messageDiv.style.display = "block";
    startConfetti(canvas);

    setTimeout(() => {
        messageDiv.style.display = "none";
        stopConfetti();
        // Voltar texto original do botão depois do tempo
        button.innerText = "Me mande um e-mail";
    }, 4000);
}

// --------- Confetti ---------
// Confetti baseado em canvas simples

let confettiInterval;
let confettiCtx;
let confettiParticles = [];

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function ConfettiParticle(x, y, r, d, color) {
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
            this.x = randomRange(0, window.innerWidth);
            this.y = -10;
            this.tilt = Math.floor(Math.random() * 10) - 10;
        }
    };
}

function startConfetti(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiCtx = canvas.getContext("2d");
    confettiParticles = [];

    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800"];

    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle(randomRange(0, window.innerWidth), randomRange(-window.innerHeight, 0), randomRange(5, 10), randomRange(0, 2 * Math.PI), colors[Math.floor(Math.random() * colors.length)]));
    }

    confettiInterval = setInterval(() => {
        confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        confettiParticles.forEach(p => {
            p.update();
            p.draw(confettiCtx);
        });
    }, 20);
}

function stopConfetti() {
    if(confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
    if(confettiCtx){
        confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
