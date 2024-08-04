class GameObject {
  constructor(game, x, y, size, health) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = size;
    this.health = health;
    this.maxHealth = health;
  }

  update() {
    // 각 오브젝트에서 오버라이드하여 사용
  }

  draw(ctx) {
    // 각 오브젝트에서 오버라이드하여 사용
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    // 각 오브젝트에서 오버라이드하여 사용
  }
}

export default GameObject;
