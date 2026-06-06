document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const characterCards = document.querySelectorAll(".character-card");

const closeCharacterPopovers = (exceptCard = null) => {
    characterCards.forEach((card) => {
        if (card === exceptCard) return;

        const trigger = card.querySelector(".character-trigger");
        const popover = card.querySelector(".character-popover");
        if (!trigger || !popover) return;

        trigger.setAttribute("aria-expanded", "false");
        popover.hidden = true;
    });
};

characterCards.forEach((card) => {
    const trigger = card.querySelector(".character-trigger");
    const popover = card.querySelector(".character-popover");
    if (!trigger || !popover) return;

    trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        closeCharacterPopovers(card);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        popover.hidden = isOpen;
    });
});

document.addEventListener("click", (event) => {
    if (event.target.closest(".character-card")) return;
    closeCharacterPopovers();
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeCharacterPopovers();
});
