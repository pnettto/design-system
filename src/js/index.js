import "./ui.js";
import "./effects.js";
import "./code-runner.js";
import { initGallery } from "./gallery.js";
import "./masonry.js";
import "./video.js";
import { generateImgTag } from "./utils/generateImgTag.js";

// PrismJS and Python component
import Prism from "prismjs";
import "prismjs/components/prism-python";

// Plyr CSS and JS
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export { generateImgTag, initGallery };
