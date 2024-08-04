import GameObject from "./GameObject.js";
import Cannon from "./cannon.js";

class Tower extends GameObject {
  constructor(game, x, y) {
    super(game, x, y, 30, 100); // size와 health 설정
    this.range = 150;
    this.attackSpeed = 1000; // 공격 속도 (ms)
    this.lastAttackTime = 0;
  }

  update() {
    const now = Date.now();
    if (now - this.lastAttackTime > this.attackSpeed) {
      const target = this.findTarget();
      if (target) {
        this.attack(target);
        this.lastAttackTime = now;
      }
    }
  }

  findTarget() {
    let closestEnemy = null;
    let closestDist = Infinity;
    this.game.enemies.forEach((enemy) => {
      const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
      if (dist < this.range && dist < closestDist) {
        closestDist = dist;
        closestEnemy = enemy;
      }
    });
    return closestEnemy;
  }

  attack(target) {
    this.game.cannons.push(
      new Cannon(this.game, this.x, this.y, target.x, target.y)
    );
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }

  takeDamage(damage) {
    super.takeDamage(damage);
    if (this.health > 0) {
      this.drawHealth(ctx);
    }
  }

  drawHealth(ctx) {
    const healthPercentage = this.health / this.maxHealth;
    ctx.fillStyle = "gray";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size * healthPercentage,
      this.size
    );
  }

  destroy() {
    const index = this.game.towers.indexOf(this);
    if (index !== -1) {
      this.game.towers.splice(index, 1);
    }
  }
}

export default Tower;
