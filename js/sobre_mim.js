

document.addEventListener("DOMContentLoaded", () => {
    const sectionEmailBtn = document.querySelector(".email-text");
    const sectionTelegramBtn = document.querySelector(".telegram-text");
    if (sectionEmailBtn) {
        sectionEmailBtn.addEventListener("click", () => {
            openEmailFromSection(sectionEmailBtn);
        });
    }

    if (sectionTelegramBtn) {
        sectionTelegramBtn.addEventListener("click", () => {
            openTelegramFromSection(sectionTelegramBtn);
        });
    }
});



