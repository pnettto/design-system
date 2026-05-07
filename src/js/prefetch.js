/* ==========================================================================
   PREFETCH - Idle prefetch of in-viewport same-origin links
   ========================================================================== */

if ("IntersectionObserver" in window && "requestIdleCallback" in window) {
    const seen = new Set();

    const prefetch = (href) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        document.head.appendChild(link);
    };

    const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const href = entry.target.href;
            if (!href || seen.has(href)) continue;
            try {
                if (new URL(href).origin !== location.origin) continue;
            } catch {
                continue;
            }
            seen.add(href);
            requestIdleCallback(() => prefetch(href));
            io.unobserve(entry.target);
        }
    });

    const observe = () => {
        document.querySelectorAll("a[href^='/'], a[href^='./']").forEach(
            (a) => io.observe(a),
        );
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", observe);
    } else {
        observe();
    }
}
