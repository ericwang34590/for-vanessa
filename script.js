/// ==========================================
// CONFIG — Change these to your exact start!
// ==========================================
const START_MONTH  = 4;    // January = 1, February = 2, ... December = 12
const START_DAY    = 26;
const START_YEAR   = 2025;
const START_HOUR   = 22;   // 0-23 (6pm = 18)
const START_MINUTE = 30;   // 0-59
const START_SECOND = 37;    // 0-59
// ==========================================

function updateTimer() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  const start = new Date(
    START_YEAR,
    START_MONTH - 1,
    START_DAY,
    START_HOUR,
    START_MINUTE,
    START_SECOND
  );

  const diff = now - start;

  if (diff < 0) return;

  // Total counters
  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("timerDays").textContent    = days;
  document.getElementById("timerHours").textContent   = hours;
  document.getElementById("timerMinutes").textContent = minutes;
  document.getElementById("timerSeconds").textContent = seconds;

  // Friendly breakdown: X years, X months, X days
  let years    = now.getFullYear() - start.getFullYear();
  let months   = now.getMonth() - start.getMonth();
  let remDays  = now.getDate() - start.getDate();

  if (remDays < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    remDays += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0)   parts.push(years   + (years   === 1 ? " year"  : " years"));
  if (months > 0)  parts.push(months  + (months  === 1 ? " month" : " months"));
  if (remDays > 0) parts.push(remDays + (remDays === 1 ? " day"   : " days"));

  document.getElementById("timerBreakdown").textContent = parts.join(", ");
}

updateTimer();
setInterval(updateTimer, 1000);

// ==========================================
// FLOATING HEARTS
// ==========================================
const heartsBg = document.getElementById("heartsBg");
const heartSymbols = ["♥", "♡", "❤", "💕"];

for (let i = 0; i < 50; i++) {
  const heart = document.createElement("span");
  heart.style.fontFamily = "Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif";
  heart.classList.add("heart-float");
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left             = Math.random() * 100 + "%";
  heart.style.fontSize         = Math.random() * 15 + 10 + "px";
  heart.style.animationDuration = Math.random() * 10 + 12 + "s";
  heart.style.animationDelay   = Math.random() * 15 + "s";
  heartsBg.appendChild(heart);
}

// ==========================================
// STATIC HEARTS
// ==========================================
const staticHearts = document.getElementById("staticHearts");

for (let i = 0; i < 30; i++) {
  const heart = document.createElement("span");
  heart.classList.add("static-heart");
  heart.textContent = "♥";
  heart.style.left           = Math.random() * 100 + "%";
  heart.style.top            = Math.random() * 100 + "%";
  heart.style.fontSize       = Math.random() * 12 + 8 + "px";
  heart.style.animationDelay = Math.random() * 3 + "s";
  staticHearts.appendChild(heart);
}

// ==========================================
// SCROLL REVEAL
// ==========================================
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.05 }
);

cards.forEach((card) => observer.observe(card));

// ==========================================
// SMOOTH SCROLL NAV
// ==========================================
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ==========================================
// MUSIC TOGGLE
// ==========================================
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  const audio = document.getElementById("bgMusic");
  if (audio) {
    if (isPlaying) {
      audio.pause();
      musicBtn.textContent = "🎵";
    } else {
      audio.play();
      musicBtn.textContent = "🔊";
    }
    isPlaying = !isPlaying;
  } else {
    alert("Add an <audio> element with your favorite song!");
  }
});