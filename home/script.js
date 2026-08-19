gsap.registerPlugin(SplitText);

const slides = [
  { word: "LEGACY",   image: "assets/compressed/1and4.jpg" },
  { word: "CRAFTED",  image: "assets/compressed/2.jpg" },
  { word: "BESPOKE",  image: "assets/compressed/3.JPG" },
  { word: "WINDMILL", image: "assets/compressed/1and4.jpg" },
];

const AUTOPLAY_MS = 4200;

const title = document.querySelector(".hero-title");
const layers = Array.from(document.querySelectorAll(".hero-layer"));
const dots = Array.from(document.querySelectorAll(".carousel-indicator span"));

/* preload all slide images so crossfades never pop in blank */
slides.forEach((s) => {
  const img = new Image();
  img.src = s.image;
});

let activeLayer = 0;

function crossfadeTo(src) {
  const incoming = layers[1 - activeLayer];
  const outgoing = layers[activeLayer];
  incoming.style.backgroundImage = `url("${src}")`;
  /* incoming must paint above outgoing or it fades in invisibly */
  gsap.set(incoming, { zIndex: 2 });
  gsap.set(outgoing, { zIndex: 1 });
  gsap.fromTo(
    incoming,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete() {
        gsap.set(outgoing, { opacity: 0 });
      },
    }
  );
  activeLayer = 1 - activeLayer;
}

let current = 0;
let split = null;
let animating = false;
let autoplayTimer = null;

function splitTitle() {
  split = SplitText.create(title, { type: "chars", mask: "chars" });
  /* replace letter-spacing with per-char margins: tracking inside the
     char boxes plus a trailing space skews text-align centering, so we
     zero it and space the mask wrappers explicitly instead */
  title.style.letterSpacing = "0";
  const boxes = split.masks && split.masks.length ? split.masks : split.chars;
  gsap.set(boxes, { marginRight: "0.15em" });
  gsap.set(boxes[boxes.length - 1], { marginRight: 0 });
}

function updateDots(i) {
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
}

function goTo(i) {
  if (animating || i === current) return;
  animating = true;
  current = i;
  updateDots(i);

  crossfadeTo(slides[i].image);

  gsap.to(split.chars, {
    yPercent: -110,
    duration: 0.45,
    stagger: { each: 0.035 },
    ease: "power2.in",
    onComplete() {
      split.revert();
      title.textContent = slides[i].word;
      splitTitle();
      gsap.fromTo(
        split.chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: { each: 0.05 },
          ease: "power4.out",
          onComplete() {
            animating = false;
          },
        }
      );
    },
  });
}

function startAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => {
    goTo((current + 1) % slides.length);
  }, AUTOPLAY_MS);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goTo(i);
    startAutoplay();
  });
});

/* one scroll/swipe gesture = one slide change. Trackpads fire dozens of
   wheel events per swipe, so after acting on one we ignore the rest for a
   cooldown window that outlasts the transition + momentum tail. */
let wheelLocked = false;

window.addEventListener(
  "wheel",
  (e) => {
    if (wheelLocked || animating || Math.abs(e.deltaY) < 10) return;
    wheelLocked = true;
    setTimeout(() => {
      wheelLocked = false;
    }, 1500);
    const dir = e.deltaY > 0 ? 1 : -1;
    goTo((current + dir + slides.length) % slides.length);
    startAutoplay();
  },
  { passive: true }
);

/* split only after fonts load so char metrics are correct */
document.fonts.ready.then(() => {
  layers[0].style.backgroundImage = `url("${slides[0].image}")`;
  gsap.to(layers[0], { opacity: 1, duration: 0.8, ease: "power2.out" });
  splitTitle();
  gsap.from(split.chars, {
    yPercent: 110,
    duration: 0.9,
    stagger: { each: 0.06 },
    ease: "power4.out",
  });
  startAutoplay();
});
