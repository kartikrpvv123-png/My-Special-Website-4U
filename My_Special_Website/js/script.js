const screens = {
  home: document.getElementById("screen-home"),
  date: document.getElementById("screen-date"),
  plan: document.getElementById("screen-plan"),
  final: document.getElementById("screen-final")
};

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noHint = document.getElementById("noHint");
const dateInput = document.getElementById("dateInput");
const dateContinue = document.getElementById("dateContinue");
const lockBtn = document.getElementById("lockBtn");
const finalDate = document.getElementById("finalDate");
const finalPlan = document.getElementById("finalPlan");
const finalText = document.getElementById("finalText");
const restartBtn = document.getElementById("restartBtn");

let selectedPlan = "";

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

yesBtn.addEventListener("click", () => {
  yesBtn.textContent = "YAY! 💗";
  setTimeout(() => showScreen("date"), 650);
});

let noClicks = 0;
const noMessages = [
  "Don't do this 😭",
  "Are you sure? 🥺",
  "The YES button is right there...",
  "Please reconsider 💔",
  "I'll ask one more time 😭",
  "Okay okay... just press YES 💗"
];

noBtn.addEventListener("mouseenter", () => {
  if (noClicks >= 2) {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 90 - 45;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
});

noBtn.addEventListener("click", () => {
  noClicks++;
  noHint.textContent = noMessages[Math.min(noClicks, noMessages.length - 1)];
  if (noClicks >= 3) {
    noBtn.textContent = "YES? 😭";
  }
});

dateInput.addEventListener("change", () => {
  dateContinue.disabled = !dateInput.value;
});

dateContinue.addEventListener("click", () => {
  if (!dateInput.value) return;
  showScreen("plan");
});

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    selectedPlan = button.dataset.plan;
    lockBtn.disabled = false;
  });
});

lockBtn.addEventListener("click", () => {
  if (!selectedPlan || !dateInput.value) return;

  const d = new Date(`${dateInput.value}T12:00:00`);
  const formatted = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  finalDate.textContent = formatted;
  finalPlan.textContent = selectedPlan;
  finalText.textContent = selectedPlan === "Surprise Me"
    ? "Ooooh... a surprise date! ✨"
    : `Our ${selectedPlan.toLowerCase()} is officially booked. 💕`;

  showScreen("final");
});

restartBtn.addEventListener("click", () => {
  selectedPlan = "";
  noClicks = 0;
  noBtn.textContent = "NO";
  noBtn.style.transform = "";
  noHint.textContent = "Don't do this 😭";
  dateInput.value = "";
  dateContinue.disabled = true;
  document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
  lockBtn.disabled = true;
  yesBtn.innerHTML = 'YES <span>✦</span>';
  showScreen("home");
});

// Set the earliest selectable date to today.
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
dateInput.min = localToday;
