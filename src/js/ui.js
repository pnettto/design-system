/* ==========================================================================
   UI - Theme, Burger Menu, Carousel Controls
   ========================================================================== */

// Theme Management
const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
};

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};

const initTheme = () => {
    const theme = getPreferredTheme();
    setTheme(theme);
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) toggle.checked = theme === "light";
};

// Initialize immediately to prevent FOUC
initTheme();

document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
        toggle.addEventListener("change", (e) => {
            setTheme(e.target.checked ? "light" : "dark");
        });
        toggle.checked = getPreferredTheme() === "light";
    }

    // Burger Menu
    const burger = document.querySelector(".burger-menu");
    if (burger) {
        burger.addEventListener("click", () => {
            const isExpanded = burger.getAttribute("aria-expanded") === "true";
            burger.setAttribute("aria-expanded", !isExpanded);
            document.body.classList.toggle("nav-open");
        });
    }

    // Carousel Controls
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-arrow.prev");
    const nextBtn = document.querySelector(".carousel-arrow.next");

    if (track && prevBtn && nextBtn) {
        const scrollAmount = 400;
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    }
});
