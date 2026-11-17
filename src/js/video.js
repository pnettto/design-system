/* ==========================================================================
   VIDEO - Plyr Video Player Integration
   ========================================================================== */

import Plyr from "plyr";

// Plyr's stylesheet is added on demand (this module only loads on pages
// with a video), so the main CSS bundle stays small.
const PLYR_CSS = "https://cdn.jsdelivr.net/npm/plyr@3.8.3/dist/plyr.css";

function ensurePlyrStyles() {
    if (document.querySelector('link[href*="plyr"][href$="plyr.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = PLYR_CSS;
    document.head.appendChild(link);
}

function initVideoPlayers(selector = ".video", options = {}) {
    const videos = document.querySelectorAll(selector);
    if (!videos.length) return [];

    ensurePlyrStyles();

    const defaultOptions = {
        autoplay: true,
        muted: true,
        loop: { active: true },
        controls: ["play", "progress", "mute", "settings", "fullscreen"],
        settings: ["speed"],
        speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
    };

    return Array.from(videos).map((video) => {
        const player = new Plyr(video, { ...defaultOptions, ...options });
        player.on("ready", (event) => {
            const instance = event.detail.plyr;
            instance.elements.container.classList.add("video-wrappdder");
        });
        return player;
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initVideoPlayers());
} else {
    initVideoPlayers();
}

window.initVideoPlayers = initVideoPlayers;
export { initVideoPlayers };
