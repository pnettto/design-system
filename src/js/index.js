import "./ui.js";
import "./effects.js";
import "./prefetch.js";
import { initGallery } from "./gallery.js";
import { generateImgTag } from "./utils/generateImgTag.js";

// Code runner / Prism — only when the page actually has a code block
if (document.querySelector("pre code, code[class*='language-']")) {
    import("./code-runner.js");
}

// Video / Plyr — only when the page actually has a video
if (document.querySelector("video")) {
    import("./video.js");
}

export { generateImgTag, initGallery };
