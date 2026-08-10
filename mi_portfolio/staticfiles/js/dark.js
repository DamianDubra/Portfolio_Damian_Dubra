document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("toggle");
    const html = document.documentElement;

    if (!btn) return;

    // Recuperar tema guardado
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
    }

    updateButton();

    btn.addEventListener("click", () => {

        const currentTheme = html.getAttribute("data-theme");

        const newTheme = currentTheme === "dark"
            ? "light"
            : "dark";

        html.setAttribute("data-theme", newTheme);

        localStorage.setItem("theme", newTheme);

        updateButton();
    });


    function updateButton() {

        const currentTheme = html.getAttribute("data-theme");

        if (currentTheme === "dark") {
            btn.textContent = "☀️";
            btn.setAttribute("title", "Cambiar a modo claro");
        } else {
            btn.textContent = "🌙";
            btn.setAttribute("title", "Cambiar a modo oscuro");
        }
    }

});