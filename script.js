const confettiColors = ["#d87a8d", "#f3c9a4", "#b8cbbb", "#dce8ef", "#ffffff"];
const confettiButton = document.querySelector("[data-confetti-button]");
const giftButton = document.querySelector("[data-gift-button]");
const surpriseMessage = document.querySelector("[data-surprise-message]");
const memoryCards = Array.prototype.slice.call(document.querySelectorAll("[data-memory-card]"));

function updateViewportHeight() {
  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateMemoryCards() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  memoryCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const start = viewportHeight * 0.78;
    const end = viewportHeight * 0.28;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    card.style.setProperty("--memory-photo-opacity", (1 - progress * 0.72).toFixed(3));
    card.style.setProperty("--memory-photo-y", `${(-12 * progress).toFixed(1)}px`);
    card.style.setProperty("--memory-photo-scale", (1 - progress * 0.025).toFixed(3));
    card.style.setProperty("--memory-text-opacity", (0.58 + progress * 0.42).toFixed(3));
    card.style.setProperty("--memory-text-y", `${(20 * (1 - progress)).toFixed(1)}px`);
  });
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

if (confettiButton) {
  confettiButton.addEventListener("click", () => launchConfetti());
}

if (giftButton) {
  giftButton.addEventListener("click", () => {
    const isOpen = giftButton.classList.toggle("is-open");

    giftButton.setAttribute("aria-expanded", String(isOpen));
    if (surpriseMessage) {
      surpriseMessage.classList.toggle("is-visible", isOpen);
    }

    if (isOpen) {
      launchConfetti(42);
    }
  });
}

window.addEventListener("scroll", updateMemoryCards, { passive: true });
window.addEventListener("resize", () => {
  updateViewportHeight();
  updateMemoryCards();
});
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    updateViewportHeight();
    updateMemoryCards();
  });
}

window.addEventListener(
  "load",
  () => {
    updateViewportHeight();
    updateMemoryCards();
    window.setTimeout(() => launchConfetti(14), 520);
  },
  { once: true },
);

updateViewportHeight();
updateMemoryCards();
