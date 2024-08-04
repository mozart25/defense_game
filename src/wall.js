import GameObject from "./GameObject.js";

class Wall extends GameObject {
  constructor(game, x, y) {
    super(game, x, y, 50, 100); // size와 health 설정
  }

  draw(ctx) {
    const healthPercentage = this.health / this.maxHealth;
    ctx.fillStyle = "gray";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size * healthPercentage,
      this.size
    );
  }

  destroy() {
    const index = this.game.walls.indexOf(this);
    if (index !== -1) {
      this.game.walls.splice(index, 1);
    }
  }
}

export default Wall;
