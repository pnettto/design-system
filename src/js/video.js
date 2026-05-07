/* ==========================================================================
   VIDEO - Plyr Video Player Integration
   ========================================================================== */

import Plyr from "plyr";
import "plyr/dist/plyr.css";

function initVideoPlayers(selector = ".video", options = {}) {
    const videos = document.querySelectorAll(selector);
    if (!videos.length) return [];

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
