/* ==========================================================================
   UI - Burger Menu, Carousel Controls
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
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
