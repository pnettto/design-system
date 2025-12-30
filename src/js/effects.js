/* ==========================================================================
   EFFECTS - Fade In & Reveal Animations
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const containerEl = document.querySelector(".container");

    setTimeout(() => {
        containerEl?.classList.add("is-loaded");
    }, 200);

    if (window.WebSocket) {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            ws.onmessage = () => {
                containerEl.classList.add("is-loaded");
            };
        };
    }

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
