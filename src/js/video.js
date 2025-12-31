/* ==========================================================================
   VIDEO - Plyr Video Player Integration
   ========================================================================== */

/**
 * Initialize Plyr video players on elements with specified selector
 * @param {string} selector - CSS selector for video elements (default: ".video")
 * @param {object} options - Plyr options override
 */
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
            console.log(`player`, player);
            const instance = event.detail.plyr;
            instance.elements.container.classList.add("video-wrappdder");
        });
        return player;
    });
}

// Auto-init on DOMContentLoaded if Plyr is available
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Plyr !== "undefined") {
        initVideoPlayers();
    }
});

window.initVideoPlayers = initVideoPlayers;
export { initVideoPlayers };
