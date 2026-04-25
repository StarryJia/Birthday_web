const confettiColors = ["#d87a8d", "#f3c9a4", "#b8cbbb", "#dce8ef", "#ffffff"];
const confettiButton = document.querySelector("[data-confetti-button]");
const giftButton = document.querySelector("[data-gift-button]");
const surpriseMessage = document.querySelector("[data-surprise-message]");

function updateViewportHeight() {
  const viewportHeight = window.visualViewport?.height || window.innerHeight;

  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
}

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

confettiButton?.addEventListener("click", () => launchConfetti());

giftButton?.addEventListener("click", () => {
  const isOpen = giftButton.classList.toggle("is-open");

  giftButton.setAttribute("aria-expanded", String(isOpen));
  surpriseMessage?.classList.toggle("is-visible", isOpen);

  if (isOpen) {
    launchConfetti(42);
  }
});

window.addEventListener("resize", updateViewportHeight);
window.visualViewport?.addEventListener("resize", updateViewportHeight);

window.addEventListener(
  "load",
  () => {
    updateViewportHeight();
    window.setTimeout(() => launchConfetti(14), 520);
  },
  { once: true },
);

updateViewportHeight();
