

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


function openEmailFromSection(button) {
    window.location.href = "mailto:cintiahills@gmail.com";
    showSectionThankYouMessage();
}

function openTelegramFromSection(button) {
    window.location.href = "https://t.me/cintiahills";
    showSectionThankYouMessage();
}

