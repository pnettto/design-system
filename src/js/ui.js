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

// Gate theme transitions until after first paint so the initial paint doesn't crossfade
requestAnimationFrame(() =>
    requestAnimationFrame(() =>
        document.documentElement.classList.add("theme-ready")
    )
);

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
        const step = () => {
            const card = track.querySelector(".carousel-card");
            if (!card) return 400;
            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || "0");
            return card.getBoundingClientRect().width + gap;
        };

        prevBtn.setAttribute("aria-label", prevBtn.getAttribute("aria-label") || "Previous");
        nextBtn.setAttribute("aria-label", nextBtn.getAttribute("aria-label") || "Next");

        const updateDisabled = () => {
            const max = track.scrollWidth - track.clientWidth - 1;
            prevBtn.toggleAttribute("disabled", track.scrollLeft <= 0);
            nextBtn.toggleAttribute("disabled", track.scrollLeft >= max);
        };

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -step(), behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: step(), behavior: "smooth" });
        });
        track.addEventListener("scroll", updateDisabled, { passive: true });
        window.addEventListener("resize", updateDisabled);
        updateDisabled();
    }
});
