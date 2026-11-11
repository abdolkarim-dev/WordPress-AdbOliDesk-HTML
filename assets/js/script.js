document.addEventListener("DOMContentLoaded", () => {
  // for change dark mode and light mode

  const root = document.documentElement;
  const languageButton = document.getElementById("languageToggle");
  const themeButton = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  let language = localStorage.getItem("abdolidesk-language") || "en";

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    root.lang = language;
    root.dir = language === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-fa]").forEach((element) => {
      element.innerHTML = element.dataset[language];
    });

    languageButton.textContent = language === "en" ? "FA" : "EN";
    localStorage.setItem("abdolidesk-language", language);
  }

  languageButton.addEventListener("click", () => {
    setLanguage(language === "en" ? "fa" : "en");
  });

  function setTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    sunIcon.classList.toggle("hidden", theme !== "dark");
    moonIcon.classList.toggle("hidden", theme === "dark");
    localStorage.setItem("abdolidesk-theme", theme);
  }

  const savedTheme = localStorage.getItem("abdolidesk-theme");
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  themeButton.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });

  setLanguage(language);
  
  // end for change dark mode and light mode
});
