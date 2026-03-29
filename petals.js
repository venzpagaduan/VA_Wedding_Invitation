const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Petal image sources
const petalSources = [
  "petal1.png",
  "petal2.png",
  "petal_green.png",
  "petal_green2.png",
  "petal_blue.png",
  "petal_blue2.png"
];

const petalImages = [];
let loadedImages = 0;

const petals = [];

// Preload all images
petalSources.forEach(src => {
  const img = new Image();
  img.src = src;

  img.onload = () => {
    loadedImages++;
    if (loadedImages === petalSources.length) {
      initPetals();
      drawPetals();
    }
  };

  petalImages.push(img);
});

function initPetals() {
  for (let i = 0; i < 50; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 25 + 15,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.6 - 0.3,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
      opacity: Math.random() * 0.5 + 0.5,

      // Assign random petal image
      img: petalImages[Math.floor(Math.random() * petalImages.length)]
    });
  }
}

function drawPetals() {
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

    // Movement
    p.y += p.speedY;

    // Add subtle wind sway
    p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;

    // Rotation
    p.angle += p.rotationSpeed;

    // Reset
    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
      p.img = petalImages[Math.floor(Math.random() * petalImages.length)];
    }
  });

  requestAnimationFrame(drawPetals);
}

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
