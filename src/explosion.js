class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = 30;
    this.expansionRate = 2;
    this.lifetime = 30;
  }

  update() {
    if (this.size < this.maxSize) {
      this.size += this.expansionRate;
    } else {
      this.lifetime--;
      if (this.lifetime <= 0) {
        const index = this.game.explosions.indexOf(this);
        this.game.explosions.splice(index, 1);
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Explosion;
