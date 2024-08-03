import Wall from "./wall.js";
class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.health = 50; // 적군 체력 추가
    this.maxHealth = 50;
    this.target = this.game.player; // 기본적으로 플레이어를 타겟으로
    this.attackPower = 5; // 공격력
  }

  update() {
    // 가까운 장벽 찾기
    let closestWall = null;
    let closestDist = Infinity;
    this.game.walls.forEach((wall) => {
      const dist = Math.hypot(wall.x - this.x, wall.y - this.y);
      if (dist < closestDist) {
        closestDist = dist;
        closestWall = wall;
      }
    });

    if (closestWall) {
      this.target = closestWall;
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 0.3;

    if (dist > this.size) {
      this.x += (dx / dist) * speed;
      this.y += (dy / dist) * speed;
    } else {
      // 공격 로직
      if (this.target instanceof Wall) {
        this.target.health -= this.attackPower;
        if (this.target.health <= 0) {
          const index = this.game.walls.indexOf(this.target);
          this.game.walls.splice(index, 1);
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );

    // 체력 표시
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(this.health, this.x - 10, this.y - this.size);
  }
}

export default Enemy;
