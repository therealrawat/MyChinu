
let audioContext;
let microphone, meter;
const sound = document.getElementById('sound');

let animationStopped = false;

// Get request for microphone usage
const requestAudioAccess = () => {
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => setAudioStream(stream))
            .catch((err) => alert('This pen requires a microphone to work properly.'));
    }
    else alert('Your browser does not support required microphone access.');
};

// Set up to record volume
const setAudioStream = (stream) => {
    audioContext = new AudioContext();
    microphone = audioContext.createMediaStreamSource(stream);
    meter = createAudioMeter(audioContext);

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    microphone.connect(filter);
    filter.connect(meter);
};

// Check if is blowing
let lowpass = 0;
const ALPHA = 0.5, THRESHOLD = 0.09;
const isBlowing = () => {
    lowpass = ALPHA * meter.volume + (1.0 - ALPHA) * lowpass;
    return (lowpass > THRESHOLD);
};

requestAudioAccess();

/////////////////////
//// CANDLE CODE ////
/////////////////////
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width = 800;
const ch = canvas.height = 400;

const particles = [];
const MAX_PART_COUNT = 100;

const REIGNITE_RATE = 2; // rate at which flame will recover
const MAX_PART_DOWNTIME = 15; // max limit at which smothered flame will recover

const rand = (min, max) => (min + Math.random() * (max - min));

// Fire Particle
class FlameParticle {
    constructor(x = cw / 2, y = ch / 2) {
        this.radius = 15;
        this.speed = { x: rand(-0.5, 0.5), y: 2.5 };
        this.life = rand(50, 100);
        this.alpha = 0.5;

        this.x = x;
        this.y = y;
        this.curAlpha = this.alpha;
        this.curLife = this.life;
    }

    update = () => {
        if (this.curLife <= 90) {
            this.radius -= Math.min(this.radius, 0.25);
            this.curAlpha -= 0.005;
        }

        if (microphone && isBlowing())
            this.x += rand(-meter.volume, meter.volume) * 50;

        this.curLife -= this.speed.y;
        this.y -= this.speed.y;
        this.draw();
    }

    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fillStyle = `rgba(254, 252, 207, ${this.curAlpha})`;
        ctx.fill();
        ctx.closePath();
    }
}

// Flame Base
class FlameBase {
    update = this.draw = () => {
        ctx.beginPath();
        ctx.arc(cw / 2, ch / 2, 14, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(185, 125, 45, 0.4)';
        ctx.fill();
        ctx.closePath();
    }
}


let base = new FlameBase();
let particleCount = MAX_PART_COUNT;

const updateParticles = () => {
    for (let i = 0; i < particleCount; i++) {
        if (particles[i].curLife < 0) particles[i] = new FlameParticle();
        particles[i].update();
    };
};

const animate = () => {
    if (!animationStopped) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, cw, ch);

        
        if (microphone && isBlowing()) {
            if (particleCount > -MAX_PART_DOWNTIME) {
                particleCount -= 1;
            } else {
                animationStopped = true; 
                const titleElement = document.getElementById('title');
                const title1Element = document.getElementById('title1');
                const confettiElement = document.querySelector('.confetti');
                confettiElement.style.display = 'flex';
                sound.play();
                titleElement.style.visibility = 'visible'; 
                setTimeout(() => {
                    titleElement.style.bottom = '50px'; 
                }, 100);
                title1Element.style.visibility = 'visible';
                setTimeout(()=>{
                    title1Element.style.top = '200px';
                }, 300);

            }
        }

        // draw flame
        updateParticles();w

        // draw base
        base.update();
    }
}

// Initial particle generation
for (let i = 0; i < MAX_PART_COUNT; i++)
    particles.push(new FlameParticle());

// Interval to recover flames if smothered
setInterval(() => {
    if (particleCount < MAX_PART_COUNT)
        particleCount += REIGNITE_RATE;
}, 200)

animate();
