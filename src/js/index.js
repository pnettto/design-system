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
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-systemd";

// Plyr CSS and JS
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export { generateImgTag, initGallery };
