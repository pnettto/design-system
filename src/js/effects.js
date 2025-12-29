/* ==========================================================================
   EFFECTS - Fade In & Reveal Animations
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".container")?.classList.add("is-loaded");
    }, 200);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const reveal = () => el.classList.add("is-loaded");

                if (el.tagName === "IMG") {
                    el.decode().then(reveal).catch(reveal);
                } else {
                    reveal();
                }

                observer.unobserve(el);
            });
        },
        { threshold: 0, rootMargin: "100px" },
    );

    const scanAndObserve = () => {
        document.querySelectorAll(".fade-in:not(.is-loaded)").forEach((el) =>
            observer.observe(el)
        );
    };

    scanAndObserve();

    // Re-scan when content changes (masonry, dynamic loading)
    const mutationObserver = new MutationObserver(scanAndObserve);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("load", scanAndObserve);
});
