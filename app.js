 
 // 1. INITIALIZE LENIS (Smooth Scroll)
const lenis = new Lenis({
    duration: 0.6, // REDUCED from 1.2 to 0.6 for snappier control
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    touchMultiplier: 2 // Makes it feel better on mobile/trackpads
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// 2. INITIALIZE GSAP
gsap.registerPlugin(ScrollTrigger);

// Animation: Reveal "Work" rows as you scroll
const workRows = document.querySelectorAll('.work-row');

workRows.forEach((row) => {
    gsap.to(row, {
        scrollTrigger: {
            trigger: row,
            start: "top 80%", // Starts when top of element hits 80% of viewport height
            end: "top 50%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Animation: Stagger the Bento Grid
gsap.from(".bento-item", {
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 70%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1 // Items appear one by one
});


// ROBUST NAV LOGIC
let lastScroll = 0;
const nav = document.querySelector('.dock-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        // Scrolling DOWN -> Hide Nav
        nav.classList.add('hidden');
    } else {
        // Scrolling UP -> Show Nav
        nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});


