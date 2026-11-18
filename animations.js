/* MORFIN — reveal elements as they enter the viewport. */
(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const elements = document.querySelectorAll([
        ".offers_article_block",
        ".offers_block",
        ".about_me_left",
        ".about_me_right",
        ".projects_article_block",
        ".projects_img_block",
        ".contact_article_block",
        ".contact_img",
        ".contact_button_block"
    ].join(","));

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("motion-reveal", "is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -32px 0px"
    });

    elements.forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.style.setProperty(
            "--motion-delay",
            `${(index % 4) * 65}ms`
        );
        observer.observe(element);
    });
})();
