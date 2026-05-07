/* ==========================================================================
   GALLERY - Lightbox with Image Optimization Support
   ========================================================================== */

import { generateImgTag } from "./utils/generateImgTag.js";

export function initGallery() {
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const galleryItems = document.querySelectorAll(
        ".gallery-item img, .work-image img",
    );

    if (!lightbox || !lightboxContent || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems).map((img) => {
        const button = img.closest(".gallery-item") ||
            img.closest(".work-image");
        return {
            src: button?.dataset.fullSrc || img.src,
            id: button?.id,
            metadata: button?.dataset.imageMetadata
                ? JSON.parse(button.dataset.imageMetadata)
                : null,
        };
    });

    function updateHash(index) {
        if (images[index]?.id) {
            history.replaceState(null, null, "#" + images[index].id);
        }
    }

    function clearHash() {
        history.replaceState(null, null, " ");
    }

    function preloadNeighbors(index) {
        [index + 1, index - 1].forEach((i) => {
            const wrapped = (i + images.length) % images.length;
            const photo = images[wrapped];
            if (!photo) return;
            const im = new Image();
            im.src = photo.src;
        });
    }

    function updateLightboxImage(index) {
        const photo = images[index];

        if (photo.metadata) {
            lightboxContent.innerHTML = generateImgTag(photo.metadata, {
                objectFit: "contain",
            });
            const img = lightboxContent.querySelector("img");
            img.classList.add("fade-out");
            img.onload = () => {
                img.classList.add("is-loaded");
                img.classList.remove("fade-out");
            };
        } else {
            lightboxContent.innerHTML =
                `<img id="lightbox-img" src="${photo.src}" alt="">`;
            const img = lightboxContent.querySelector("img");
            img.onload = () => img.classList.add("is-loaded");
        }

        preloadNeighbors(index);
    }

    function openLightbox(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        updateLightboxImage(currentIndex);
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.classList.add("visible");
        document.body.style.overflow = "hidden";
        updateHash(index);
    }

    function closeLightbox() {
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.classList.remove("visible");
        document.body.style.overflow = "";
        clearHash();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(currentIndex);
        updateHash(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(currentIndex);
        updateHash(currentIndex);
    }

    // Event Listeners
    galleryItems.forEach((img, index) => {
        img.closest("button")?.addEventListener(
            "click",
            () => openLightbox(index),
        );
    });

    closeBtn?.addEventListener("click", closeLightbox);
    nextBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrev();
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
        if (lightbox.getAttribute("aria-hidden") === "true") return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    // Touch Navigation — swipe horizontally to navigate
    let touchStartX = 0;
    let touchStartY = 0;
    let touchTracking = false;
    const SWIPE_THRESHOLD = 40;

    lightbox.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) {
            touchTracking = false;
            return;
        }
        touchTracking = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener("touchend", (e) => {
        if (!touchTracking) return;
        touchTracking = false;
        if (e.changedTouches.length !== 1) return;

        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

        if (dx < 0) showNext();
        else showPrev();
    });

    // Deep link from hash
    const hash = window.location.hash;
    if (hash) {
        const id = hash.substring(1);
        const index = images.findIndex((img) => img.id?.startsWith(id));
        if (index !== -1) openLightbox(index);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallery);
} else {
    initGallery();
}
