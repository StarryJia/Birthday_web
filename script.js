const confettiColors = ["#d87a8d", "#f3c9a4", "#b8cbbb", "#dce8ef", "#ffffff"];
const confettiButton = document.querySelector("[data-confetti-button]");
const giftButton = document.querySelector("[data-gift-button]");
const surpriseMessage = document.querySelector("[data-surprise-message]");
const memoryCards = [...document.querySelectorAll("[data-memory-card]")];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function launchConfetti(amount = 28) {
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    const size = Math.random() * 7 + 5;

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.15}px`;
    piece.style.background = confettiColors[index % confettiColors.length];
    piece.style.animationDelay = `${Math.random() * 0.28}s`;
    piece.style.setProperty("--drift", `${Math.random() * 140 - 70}px`);

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function updateMemoryCards() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  memoryCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const travel = Math.max(1, rect.height - viewportHeight);
    const progress = clamp(-rect.top / travel, 0, 1);
    const reveal = clamp((progress - 0.34) / 0.42, 0, 1);

    card.style.setProperty("--reveal", reveal.toFixed(3));
    card.style.setProperty("--photo-opacity", (1 - reveal).toFixed(3));
    card.style.setProperty("--photo-y", `${(-22 * reveal).toFixed(1)}px`);
    card.style.setProperty("--photo-scale", (1 - reveal * 0.04).toFixed(3));
    card.style.setProperty("--photo-saturation", (1 - reveal * 0.25).toFixed(3));
    card.style.setProperty("--photo-blur", `${(7 * reveal).toFixed(1)}px`);
    card.style.setProperty("--text-y", `${(26 * (1 - reveal)).toFixed(1)}px`);
  });
}

confettiButton?.addEventListener("click", () => launchConfetti());

giftButton?.addEventListener("click", () => {
  const isOpen = giftButton.classList.toggle("is-open");

  giftButton.setAttribute("aria-expanded", String(isOpen));
  surpriseMessage?.classList.toggle("is-visible", isOpen);

  if (isOpen) {
    launchConfetti(42);
  }
});

window.addEventListener("scroll", updateMemoryCards, { passive: true });
window.addEventListener("resize", updateMemoryCards);

window.addEventListener(
  "load",
  () => {
    updateMemoryCards();
    window.setTimeout(() => launchConfetti(14), 520);
  },
  { once: true },
);
