function scrollToSection(id){
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

const nav = document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll("nav a");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

/* FADE-IN ANIMATION */
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
});

sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(40px)';
  sec.style.transition = 'all 0.8s ease';
});

const storyPhotoStack = document.querySelector('.story-photo-stack');

if (storyPhotoStack) {
  const setStoryPhotoState = (isExpanded) => {
    storyPhotoStack.classList.toggle('is-expanded', isExpanded);
    storyPhotoStack.setAttribute('aria-expanded', String(isExpanded));
    storyPhotoStack.setAttribute(
      'aria-label',
      isExpanded ? 'Collapse photo stack' : 'Open photo stack'
    );
  };

  storyPhotoStack.addEventListener('click', () => {
    setStoryPhotoState(!storyPhotoStack.classList.contains('is-expanded'));
  });

  storyPhotoStack.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setStoryPhotoState(!storyPhotoStack.classList.contains('is-expanded'));
    }
  });
}

const countdown = document.getElementById("wedding-countdown");

if (countdown) {
  const countdownValues = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]')
  };
  const weddingDate = new Date("December 3, 2026 00:00:00");

  const updateCountdown = () => {
    const now = new Date();
    const distance = weddingDate - now;

    if (distance <= 0) {
      countdownValues.days.textContent = "0";
      countdownValues.hours.textContent = "0";
      countdownValues.minutes.textContent = "0";
      countdownValues.seconds.textContent = "0";
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownValues.days.textContent = String(days);
    countdownValues.hours.textContent = String(hours).padStart(2, "0");
    countdownValues.minutes.textContent = String(minutes).padStart(2, "0");
    countdownValues.seconds.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}




/* FALLING PETALS (PNG VERSION) */

const canvas = document.getElementById("petals");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const petalSources = [
    "petal1.png",
    "petal2.png",
    "petal_green.png",
    "petal_green2.png",
    "petal_blue.png",
    "petal_blue2.png"
  ];

  const petalImages = [];
  let resolved = 0;

  let petals = [];

  // Preload every petal asset and keep going even if one file fails.
  petalSources.forEach(src => {
    const img = new Image();

    const handleResolved = () => {
      resolved++;
      if (resolved === petalSources.length && petalImages.length) {
        init();
        draw();
      }
    };

    img.onload = () => {
      petalImages.push(img);
      handleResolved();
    };

    img.onerror = handleResolved;
    img.src = src;
  });

  function init() {
    for (let i = 0; i < 50; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.5 + 0.5,
        img: petalImages[Math.floor(Math.random() * petalImages.length)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(p => {

      ctx.save();

      ctx.globalAlpha = p.opacity;

      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      ctx.drawImage(
        p.img,
        -p.size / 2,
        -p.size / 2,
        p.size,
        p.size
      );

      ctx.restore();

      // movement
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;

      // rotation
      p.angle += p.rotationSpeed;

      // reset
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
        p.img = petalImages[Math.floor(Math.random() * petalImages.length)];
      }

    });

    requestAnimationFrame(draw);
  }

  // responsive canvas
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

}



function applyStoryScale() {
  const baseWidth = 1100;
  const screenWidth = window.innerWidth;

  const scale = Math.min(screenWidth / baseWidth, 1);

  const story = document.querySelector('.story-fixed');
  const wrapper = document.querySelector('.story-scale-wrapper');

  if (!story || !wrapper) return;

  story.style.transform = `scale(${scale})`;

  // adjust height to prevent collapsing
  wrapper.style.height = `${story.offsetHeight * scale}px`;
}
