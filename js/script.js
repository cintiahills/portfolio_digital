
const email = "cintiahills@gmail.com";


function showHoverText(button) {
    if (button.innerText === "Fale com a Cintia") {
        button.innerText = "copiar e-mail";
    }
}

function restoreOriginalText(button) {
    if (button.innerText === "copiar e-mail" || button.innerText === "Copiado! 😎") {
        button.innerText = "Fale com a Cintia";
    }
}

function copyEmail(button) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email)
            .then(() => {
                button.innerText = "Copiado! 😎";
            })
            .catch(() => {
                fallbackCopyEmail(button);
            });
    } else {
        fallbackCopyEmail(button);
    }
}

function fallbackCopyEmail(button) {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    button.innerText = "Copiado! 😎";
}