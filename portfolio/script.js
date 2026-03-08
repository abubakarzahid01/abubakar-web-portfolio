const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const year = document.getElementById("year");

// Footer year
if (year) year.textContent = new Date().getFullYear();

// Mobile menu toggle
menuBtn?.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) sidebar.classList.remove("open");
  });
});

// ===== Certificates Popup with Next/Prev =====
const certModal = document.getElementById("certModal");
const certPreview = document.getElementById("certPreview");
const certTitle = document.getElementById("certTitle");

const certClose = document.getElementById("certClose");
const certX = document.getElementById("certX");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");

const certCards = Array.from(document.querySelectorAll(".cert-card"));
let currentIndex = 0;

function openCert(index){
  currentIndex = index;
  const card = certCards[currentIndex];
  certTitle.textContent = card.dataset.title || "Certificate";
  certPreview.src = card.dataset.img;
  certModal.classList.add("open");
  certModal.setAttribute("aria-hidden", "false");
}

function closeCert(){
  certModal.classList.remove("open");
  certModal.setAttribute("aria-hidden", "true");
  certPreview.src = "";
}

certCards.forEach((card, idx) => {
  card.addEventListener("click", () => openCert(idx));
});

certPrev.addEventListener("click", () => {
  openCert((currentIndex - 1 + certCards.length) % certCards.length);
});

certNext.addEventListener("click", () => {
  openCert((currentIndex + 1) % certCards.length);
});

certClose.addEventListener("click", closeCert);
certX.addEventListener("click", closeCert);

document.addEventListener("keydown", (e) => {
  if(!certModal.classList.contains("open")) return;
  if(e.key === "Escape") closeCert();
  if(e.key === "ArrowLeft") certPrev.click();
  if(e.key === "ArrowRight") certNext.click();
});

// ScrollSpy: change active sidebar link while scrolling
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a.nav-link");

function setActiveLink() {
  const scrollY = window.scrollY;

  let currentId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;      
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);


