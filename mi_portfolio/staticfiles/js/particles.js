const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const particles = [];
const amount = 120;

class Particle{

    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.size = Math.random()*3+1;

        this.speedX = (Math.random()-0.5)*1;
        this.speedY = (Math.random()-0.5)*1;
    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x<0 || this.x>canvas.width)
            this.speedX *= -1;

        if(this.y<0 || this.y>canvas.height)
            this.speedY *= -1;
    }

    draw(){

        ctx.beginPath();
        ctx.fillStyle="#61dafb";
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
        
    }

}

function init(){

    particles.length = 0;

    for(let i=0;i<amount;i++){

        particles.push(new Particle());

    }

}

init();

function connect(){

    for(let a=0;a<particles.length;a++){

        for(let b=a+1;b<particles.length;b++){

            const dx=particles[a].x-particles[b].x;
            const dy=particles[a].y-particles[b].y;

            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<120){

                ctx.beginPath();
                ctx.strokeStyle="rgba(97,218,251,0.2)";
                ctx.lineWidth=1;
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.stroke();

            }

        }

    }

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const p of particles){

        p.update();
        p.draw();

    }

    connect();

    requestAnimationFrame(animate);

}

animate();