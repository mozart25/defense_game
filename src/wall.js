class Wall {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 50;
    this.health = 100; // 장벽 체력
  }

  update() {
    // 장벽 업데이트 로직
  }

  draw(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );

    // 장벽 체력 표시
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(this.health, this.x - 10, this.y + 4);
  }
}

export default Wall;
