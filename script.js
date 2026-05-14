// Loader Animation
const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loader-bar");

document.body.classList.add("loading");

let width = 0;

const interval = setInterval(() => {
  width += 10;
  loaderBar.style.width = `${width}%`;

  if (width >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add("hidden-loader");
      document.body.classList.remove("loading");
    }, 500);
  }
}, 150);


// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  setLightMode();
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    setLightMode();
    localStorage.setItem("theme", "light");
  } else {
    setDarkMode();
    localStorage.setItem("theme", "dark");
  }
});

function setLightMode() {
  body.classList.remove("bg-slate-950", "text-white");
  body.classList.add("bg-white", "text-black");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

function setDarkMode() {
  body.classList.add("bg-slate-950", "text-white");
  body.classList.remove("bg-white", "text-black");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}


// Mobile Menu Toggle 
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    mobileMenu.classList.remove("max-h-0", "opacity-0");
    mobileMenu.classList.add("max-h-96", "opacity-100");
  } else {
    mobileMenu.classList.add("max-h-0", "opacity-0");
    mobileMenu.classList.remove("max-h-96", "opacity-100");
  }
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("max-h-0", "opacity-0");
    mobileMenu.classList.remove("max-h-96", "opacity-100");
    menuOpen = false;
  });
});


// ScrollReveal
const sr = ScrollReveal({
  distance: "60px",
  duration: 1000,
  delay: 200,
  reset: false,
  easing: "ease-in-out"
});

sr.reveal("#home h1", { origin: "bottom" });
sr.reveal("#home p",  { origin: "bottom", delay: 300 });
sr.reveal("#home a",  { origin: "bottom", interval: 200 });
sr.reveal("section h2", { origin: "top" });
sr.reveal("#about img", { origin: "left" });
sr.reveal("#about div", { origin: "right" });
sr.reveal("#skills .group", { origin: "bottom", interval: 150 });
sr.reveal("#contact form", { origin: "bottom" });


// Typed.js
new Typed("#typing", {
  strings: [
    "Frontend Developer",
    "JavaScript Developer",
    "Tailwind CSS Expert",
    "UI Designer"
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
});


// Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-amber-400");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-amber-400");
    }
  });
});


// GitHub Projects + Filter

const username = "agiddid-source";
const container = document.getElementById("projects-container");
const filterButtons = document.querySelectorAll(".filter-btn");

// Maps a GitHub repo language to a filter category
function getCategory(language) {
  if (!language) return "other";
  const lang = language.toLowerCase();
  if (lang === "javascript") return "javascript";
  if (lang === "html")       return "html";
  if (lang === "css")        return "css";
  return "other";
}

// Language badge colours
function getLangColor(language) {
  const colors = {
    JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    HTML:       "bg-orange-500/10 text-orange-400 border-orange-500/20",
    CSS:        "bg-blue-500/10   text-blue-400   border-blue-500/20",
    TypeScript: "bg-sky-500/10    text-sky-400    border-sky-500/20",
  };
  return colors[language] || "bg-amber-500/10 text-amber-400 border-amber-500/20";
}

// Render skeleton placeholders while fetching
function renderSkeletons(count = 6) {
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "animate-pulse rounded-3xl border border-slate-800 bg-slate-900/60 p-6 h-64";
    skeleton.innerHTML = `
      <div class="h-5 bg-slate-700 rounded w-2/3 mb-5"></div>
      <div class="h-4 bg-slate-800 rounded w-full mb-3"></div>
      <div class="h-4 bg-slate-800 rounded w-5/6 mb-8"></div>
      <div class="flex gap-3 mb-8">
        <div class="h-8 w-20 rounded-full bg-slate-700"></div>
        <div class="h-8 w-20 rounded-full bg-slate-700"></div>
      </div>
      <div class="flex justify-between">
        <div class="h-4 w-16 bg-slate-700 rounded"></div>
        <div class="h-4 w-16 bg-slate-700 rounded"></div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

// Build and inject a project card DOM element
function createCard(repo) {
  const category = getCategory(repo.language);
  const langColor = getLangColor(repo.language);

  const card = document.createElement("div");
  card.className = [
    "project-card group relative overflow-hidden",
    "bg-slate-900/50 backdrop-blur-xl",
    "border border-slate-800",
    "rounded-3xl p-7",
    "transition duration-500",
    "hover:-translate-y-3",
    "hover:border-amber-500/40",
    "hover:shadow-2xl",
    "hover:shadow-amber-500/10",
  ].join(" ");
  card.setAttribute("data-category", category);

  card.innerHTML = `
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>

    <div class="relative z-10 flex flex-col h-full">

      <div class="flex items-start justify-between mb-4">
        <h3 class="text-xl font-bold text-white leading-snug pr-4">
          ${repo.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>
        <a href="${repo.html_url}" target="_blank" aria-label="View on GitHub" class="shrink-0">
          <i class="fa-brands fa-github text-2xl text-slate-500 group-hover:text-amber-400 transition"></i>
        </a>
      </div>

      <p class="text-slate-400 leading-relaxed mb-6 flex-1 min-h-[60px]">
        ${repo.description || "No description provided."}
      </p>

      <div class="flex flex-wrap gap-2 mb-5">
        <span class="px-3 py-1 rounded-full text-sm border ${langColor}">
          ${repo.language || "Unknown"}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm text-slate-400 mb-6">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-star text-amber-400"></i>
          ${repo.stargazers_count}
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-code-branch text-cyan-400"></i>
          ${repo.forks_count}
        </div>
      </div>

      <div class="flex gap-3">
        <a href="${repo.html_url}" target="_blank"
           class="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-xl font-medium transition duration-300 hover:-translate-y-1">
          GitHub
        </a>
        ${repo.homepage ? `
        <a href="${repo.homepage}" target="_blank"
           class="flex-1 text-center border border-slate-700 hover:border-amber-500 hover:text-amber-400 py-3 rounded-xl font-medium transition duration-300 hover:-translate-y-1">
          Live Demo
        </a>` : ""}
      </div>

    </div>
  `;

  return card;
}

// Apply the active filter to rendered cards
function applyFilter(filter) {
  const cards = container.querySelectorAll(".project-card");

  cards.forEach(card => {
    const category = card.getAttribute("data-category");
    const match = filter === "all" || category === filter;

    if (match) {
      card.classList.remove("hidden", "opacity-0", "scale-95");
    } else {
      card.classList.add("opacity-0", "scale-95");
      setTimeout(() => card.classList.add("hidden"), 300);
    }
  });
}

// Wire up filter buttons
function initFilters() {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("active-filter", "bg-amber-500", "text-black");
      });

      button.classList.add("active-filter", "bg-amber-500", "text-black");
      applyFilter(button.getAttribute("data-filter"));
    });
  });
}

// Fetch repos and render cards
async function fetchGitHubProjects() {
  renderSkeletons(6);

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const repos = await res.json();

    const filtered = repos
      .filter(repo => !repo.fork)
      .sort((a, b) =>
        (b.stargazers_count + b.watchers_count) -
        (a.stargazers_count + a.watchers_count)
      )
      .slice(0, 9);

    container.innerHTML = "";

    filtered.forEach(repo => {
      const card = createCard(repo);
      container.appendChild(card);
    });

    // Respect whichever filter is currently active
    const activeBtn = document.querySelector(".filter-btn.active-filter");
    const currentFilter = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    applyFilter(currentFilter);

    // ScrollReveal on dynamically injected cards
    sr.reveal(".project-card", { origin: "bottom", interval: 150 });

  } catch (error) {
    console.error("GitHub API Error:", error);
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <i class="fa-brands fa-github text-5xl text-slate-600 mb-4 block"></i>
        <p class="text-red-400 text-lg">Failed to load projects. Please try again later.</p>
      </div>
    `;
  }
}

initFilters();
fetchGitHubProjects();


// EmailJS Contact Form
emailjs.init("gkiWufZWasaClj5jf");

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  formMessage.textContent = "Sending...";
  formMessage.className = "text-amber-400 text-sm mt-4 text-center";

  try {
    await emailjs.sendForm(
      "service_8cu7xlm",
      "template_pm1i5dg",
      contactForm
    );

    formMessage.textContent = "✅ Message sent successfully!";
    formMessage.className = "text-green-400 text-sm mt-4 text-center";
    contactForm.reset();

  } catch (error) {
    formMessage.textContent = "❌ Failed to send message. Please try again.";
    formMessage.className = "text-red-400 text-sm mt-4 text-center";
    console.error(error);

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
