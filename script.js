(function () {
    // Theme init from storage
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else {
        // Default dark
        root.setAttribute("data-theme", "dark");
    }

    // Toggle theme
    const toggleBtn = document.getElementById("theme-toggle");
    const setIcon = () => {
        const theme = root.getAttribute("data-theme");
        toggleBtn.textContent = theme === "light" ? "🌞" : "🌙";
    };
    setIcon();

    toggleBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        setIcon();
    });

    // Intersection Observer animations
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("in-view");
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => io.observe(el));

    // Copy email
    const copyBtn = document.getElementById("copy-email");
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            const email = copyBtn.getAttribute("data-email");
            try {
                await navigator.clipboard.writeText(email);
                copyBtn.textContent = "Copied!";
                setTimeout(() => (copyBtn.textContent = "Copy Email"), 1500);
            } catch {
                alert("Copy failed. Please copy manually.");
            }
        });
    }

    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();