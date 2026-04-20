// 1. INITIALIZE LENIS
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. NAVBAR LOGIC
const nav = document.querySelector('.dock-nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        if (currentScroll > lastScroll) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }
    lastScroll = currentScroll;
});

// 3. ANIMATION (Reveal Rows)
gsap.registerPlugin(ScrollTrigger);

const workRows = document.querySelectorAll('.work-row');

workRows.forEach((row) => {
    gsap.to(row, {
        scrollTrigger: {
            trigger: row,
            start: "top 80%", 
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 4. LIGHTBOX LOGIC
const workSection = document.querySelector('.work-section');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const closeBtn = document.querySelector('.close-btn');

// Open on Click
if (workSection) {
    workSection.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            lightboxContent.innerHTML = '';
            const clone = e.target.cloneNode(true);
            
            clone.style.cssText = ''; // Reset styles
            if (clone.tagName === 'VIDEO') {
                clone.setAttribute('controls', '');
                clone.setAttribute('autoplay', '');
                clone.muted = false;
            }
            
            lightboxContent.appendChild(clone);
            lightbox.classList.add('active');
            lenis.stop(); 
        }
    });
}

// Close Logic
function closePopup() {
    lightbox.classList.remove('active');
    lenis.start();
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closePopup();
    });
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
}
