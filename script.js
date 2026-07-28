const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

function drawHeart(x, y, size) {

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.bezierCurveTo(
        x, y - size / 2,
        x - size, y - size / 2,
        x - size, y
    );

    ctx.bezierCurveTo(
        x - size, y + size / 2,
        x, y + size,
        x, y + size * 1.4
    );

    ctx.bezierCurveTo(
        x, y + size,
        x + size, y + size / 2,
        x + size, y
    );

    ctx.bezierCurveTo(
        x + size, y - size / 2,
        x, y - size / 2,
        x, y
    );

    ctx.closePath();

    ctx.fill();
}


class Heart {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * (canvas.height + 100);

        this.size = Math.random() * 40 + 20;

        this.speed = Math.random() * 2 + 1;

        this.alpha = 1;

        if (this.y < -50 || this.alpha <= 0) {

            this.reset();
        }

        this.angle = Math.random() * Math.PI * 2;
        this.waveSpeed = Math.random() * 0.05 + 0.01;

        this.rotation = Math.random() * Math.PI * 2;

        this.rotationSpeed = (Math.random() - 0.5) * 0.03;

    }

    update() {

        this.y -= this.speed;

        this.angle += this.waveSpeed;

        this.x += Math.sin(this.angle) * 1.2;

        if (this.y < -50) {

            this.reset();

        }

        this.rotation += this.rotationSpeed;

        this.alpha -= 0.003;

    }

    draw() {

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.shadowColor = "#ff3b8d";
        ctx.shadowBlur = 20;

        ctx.fillStyle = "#ff4d88";

        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotation);

        ctx.fillStyle = "#ff4d88";

        drawHeart(0, 0, this.size / 2);

        drawHeart(this.x, this.y, this.size / 2);

        ctx.restore();

    }

}

const hearts = [];

for (let i = 0; i < 50; i++) {

    hearts.push(new Heart());

}

resize();

window.addEventListener("resize", resize);

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const heart of hearts) {

        heart.update();

        heart.draw();

    }

    requestAnimationFrame(animate);

}

animate();
