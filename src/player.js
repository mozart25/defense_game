import Tower from "./tower.js";

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 5;
    this.targetX = x;
    this.targetY = y;
    this.moving = false;
    this.controls();
  }

  controls() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.y -= this.speed;
          break;
        case "ArrowDown":
          this.y += this.speed;
          break;
        case "ArrowLeft":
          this.x -= this.speed;
          break;
        case "ArrowRight":
          this.x += this.speed;
          break;
      }
    });
  }

  moveTo(x, y, callback) {
    this.targetX = x;
    this.targetY = y;
    this.moving = true;
    this.onReachTarget = callback;
  }

  update() {
    if (this.moving) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.speed) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;
        if (this.onReachTarget) this.onReachTarget();
      } else {
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

export default Player;
