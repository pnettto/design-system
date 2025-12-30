export function generateImgTag(imageDataRaw, options = {}) {
    const { images: imageData } = imageDataRaw;

    let {
        className = "",
        sizes = "",
        aspectRatio,
        objectFit = "cover",
    } = options;

    if (!imageDataRaw || !imageDataRaw.images) {
        return "";
    }

    const sources = Object.entries(imageData).map(([format, variants]) => {
        const srcset = variants.map((v) => {
            const url = v.url;
            return `${url} ${v.width}w`;
        }).join(", ");
        const type = variants[0].format;
        return `<source type="image/${type}" srcset="${srcset}" sizes="${
            options?.sizes ?? "90vw"
        }">`;
    }).join("\n");

    const fallback = imageDataRaw.images.jpeg.at(-1);
    const fallbackUrl = fallback.url;

    if (!aspectRatio) {
        aspectRatio = `${fallback.width} / ${fallback.height}`;
    }

    const imgTag = `
        <img 
        src="${fallbackUrl}"
        alt=""
        class="fade-in ${className}"
        ${sizes ? ` sizes="${sizes}"` : ""}
        loading="lazy"
        decoding="async"
        style="width: 100%; height: 100%; object-fit: ${objectFit};"
        />
    `.trim();

    const wrapperStyle =
        `width: 100%; aspect-ratio: ${aspectRatio}; background-color: var(--bg-secondary);`;

    const pictureStyle = `width: 100%; height: 100%;`;

    console.log("hey");

    return `
        <div style="${wrapperStyle}" class="optimized-image-tag">
            <picture style="${pictureStyle}">
                ${sources}
                ${imgTag}
            </picture>
        </div>
    `.trim();
}
