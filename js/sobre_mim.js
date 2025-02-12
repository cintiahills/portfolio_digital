

const email = "cintiahills@gmail.com";

function showHoverText(element) {
    if (element.innerText === "Fale com a Cintia" || element.innerText === "Entre em contacto") {
        element.innerText = "Clique para copiar";
    }
}

function restoreOriginalText(element) {
    if (element.innerText === "Clique para copiar" || element.innerText === "Copiado! 😎") {
        if (element.classList.contains('cta-button')) {
            element.innerText = "Fale com a Cintia";
        } else {
            element.innerText = "Entre em contacto";
        }
    }
}

function copyEmail(element) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            element.innerText = "Copiado! 😎";
        }).catch(() => {
            fallbackCopyEmail(element);
        });
    } else {
        fallbackCopyEmail(element);
    }
}

// Fallback para navegadores sem suporte ao Clipboard API
function fallbackCopyEmail(element) {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const textElement = element.querySelector("span");
    textElement.innerText = "Copiado! 😎";
}

// Event listeners para todos os botões de cópia
document.querySelectorAll('.cta-button, .email-copy-container').forEach(button => {
    button.addEventListener('mouseover', function () { showHoverText(button); });
    button.addEventListener('mouseout', function () { restoreOriginalText(button); });
    button.addEventListener('click', function () { copyEmail(button); });
});


