document.addEventListener("DOMContentLoaded", () => {
    const sectionEmailBtn = document.querySelector(".email-text");
    const sectionTelegramBtn = document.querySelector(".telegram-text");
    
    if (sectionEmailBtn) {
        sectionEmailBtn.addEventListener("click", () => {
            // Usa a função global que já existe no script.js
            GlobalSystem.openMailClient(sectionEmailBtn);
        });
        
        // Adiciona efeito de hover também
        sectionEmailBtn.addEventListener("mouseenter", () => {
            sectionEmailBtn.textContent = "Clique para abrir";
        });
        
        sectionEmailBtn.addEventListener("mouseleave", () => {
            sectionEmailBtn.textContent = "Clique para me mandar um e-mail";
        });
    }

    if (sectionTelegramBtn) {
        sectionTelegramBtn.addEventListener("click", () => {
            // Usa a função global que já existe no script.js
            GlobalSystem.openTelegram(sectionTelegramBtn);
        });
        
        // Adiciona efeito de hover também
        sectionTelegramBtn.addEventListener("mouseenter", () => {
            sectionTelegramBtn.textContent = "Abrir Telegram";
        });
        
        sectionTelegramBtn.addEventListener("mouseleave", () => {
            sectionTelegramBtn.textContent = "Clique para abrir meu telegram";
        });
    }
});