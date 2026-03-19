document.addEventListener("DOMContentLoaded", function(){

/* AOS */

AOS.init({
duration:1200,
once:true
});


/* COUNTDOWN */

const weddingDate = new Date("Dec 3 2026").getTime();

setInterval(()=>{

const now = new Date().getTime();
const distance = weddingDate - now;

const days = Math.floor(distance/(1000*60*60*24));

const countdown = document.getElementById("countdown");
if(countdown){
countdown.innerHTML = days + " days until our wedding";
}

},1000);


/* LIGHTBOX */

window.openLightbox = function(img){

document.getElementById("lightbox").style.display="flex";
document.getElementById("lightbox-img").src = img.src;

}

window.closeLightbox = function(){

document.getElementById("lightbox").style.display="none";

}


/* MUSIC */

const music = document.getElementById("bgMusic");

window.toggleMusic = function(){

if(!music) return;

if(music.paused){
music.play().catch(()=>{});
}else{
music.pause();
}

}


/* PHOTO WALL */

const upload = document.getElementById("photoUpload");

if(upload){

upload.addEventListener("change",function(e){

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(){

const img = document.createElement("img");

img.src = reader.result;
img.style.width="150px";
img.style.margin="10px";

document.getElementById("photoWall").appendChild(img);

}

reader.readAsDataURL(file);

});

}


/* GUESTBOOK */

window.addMessage = function(){

const name = document.getElementById("name").value;
const msg = document.getElementById("msg").value;

if(!name || !msg) return;

const entry = document.createElement("div");

entry.innerHTML = "<b>"+name+"</b><p>"+msg+"</p>";

document.getElementById("guestbook").appendChild(entry);

document.getElementById("name").value="";
document.getElementById("msg").value="";

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
    "petal3.png"
  ];

  const petalImages = [];
  let loaded = 0;

  let petals = [];

  // preload images
  petalSources.forEach(src => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      loaded++;
      if (loaded === petalSources.length) {
        init();
        draw();
      }
    };

    petalImages.push(img);
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


/* CURTAIN INTRO */

const curtain = document.getElementById("curtainIntro");

if(curtain){

document.body.style.overflow="hidden";

function openCurtain(){

curtain.classList.add("open");

if(music){
music.play().catch(()=>{});
}

document.body.style.overflow="auto";

setTimeout(()=>{
curtain.style.display="none";
},1600);

}

curtain.addEventListener("click",openCurtain);
curtain.addEventListener("touchstart",openCurtain);

}

});