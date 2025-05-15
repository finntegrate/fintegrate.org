// Initialize Vanta.js when scripts are loaded
function initVanta() {
    if (
        typeof VANTA !== "undefined" &&
        document.getElementById("hero-vanta")
    ) {
        // Get reduced motion preference
        const prefersReducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            localStorage.getItem("reduced-motion") === "true";

        // Configure Vanta with accessibility in mind
        window.vantaEffect = VANTA.NET({
            el: "#hero-vanta",
            mouseControls: !prefersReducedMotion,
            touchControls: !prefersReducedMotion,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3b82f6, // Primary color
            backgroundColor: 0x111827, // Dark background
            points: prefersReducedMotion ? 4 : 12,
            maxDistance: prefersReducedMotion ? 10.0 : 22.0,
            spacing: prefersReducedMotion ? 20.0 : 14.0,
            speed: prefersReducedMotion ? 0.3 : 1.0,
        });

        // Listen for changes in user preference
        window
            .matchMedia("(prefers-reduced-motion: reduce)")
            .addEventListener("change", (e) => {
                if (window.vantaEffect) {
                    if (e.matches) {
                        // Apply reduced motion settings
                        window.vantaEffect.setOptions({
                            mouseControls: false,
                            touchControls: false,
                            points: 4,
                            maxDistance: 10.0,
                            spacing: 20.0,
                            speed: 0.3,
                        });
                    } else {
                        // Restore normal settings if no localStorage override
                        if (localStorage.getItem("reduced-motion") !== "true") {
                            window.vantaEffect.setOptions({
                                mouseControls: true,
                                touchControls: true,
                                points: 12,
                                maxDistance: 22.0,
                                spacing: 14.0,
                                speed: 1.0,
                            });
                        }
                    }
                }
            });
    }
}

// Wait for everything to load
window.addEventListener('load', function () {
    // Try to initialize immediately
    if (typeof VANTA !== "undefined") {
        initVanta();
    } else {
        // Retry with a short delay to ensure scripts have loaded
        setTimeout(function () {
            if (typeof VANTA !== "undefined") {
                initVanta();
            } else {
                console.warn("VANTA not loaded yet, trying again in 200ms");
                // Final attempt after a longer delay
                setTimeout(function () {
                    if (typeof VANTA !== "undefined") {
                        initVanta();
                    } else {
                        console.error("Failed to load VANTA library");
                    }
                }, 200);
            }
        }, 100);
    }
});
