import Explosion from "./explosion.js";

class Cannon {
  constructor(game, x, y, targetX, targetY) {
    this.game = game;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = 5;
    this.speed = 5;

    // 초기 속도와 각도 계산
    const dx = targetX - x;
    const dy = targetY - y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    this.angle = Math.atan2(dy, dx);

    this.gravity = 0.2; // 중력 가속도
    this.vx = (dx / this.distance) * this.speed;
    this.vy =
      (dy / this.distance) * this.speed -
      (this.gravity * (this.distance / this.speed)) / 2;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // 목표에 도달했는지 확인
    if (Math.hypot(this.x - this.targetX, this.y - this.targetY) < this.size) {
      this.explode();
    }
  }

  explode() {
    // 폭발 이펙트 추가
    this.game.explosions.push(new Explosion(this.game, this.x, this.y));

    // 폭발 범위 내의 적군에게 피해를 줌
    const explosionRadius = 30;
    let enemiesHit = 0;
    this.game.enemies.forEach((enemy) => {
      const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
      if (dist < explosionRadius) {
        enemy.health -= 20; // 대포 폭발 피해
        enemiesHit++;
        if (enemy.health <= 0) {
          const index = this.game.enemies.indexOf(enemy);
          this.game.enemies.splice(index, 1);
        }
      }
    });

    this.game.eventSystem.log(`Cannon exploded, hit ${enemiesHit} enemies`);

    // 대포 제거
    const index = this.game.cannons.indexOf(this);
    this.game.cannons.splice(index, 1);
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Cannon;
