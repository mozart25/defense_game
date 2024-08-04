import Player from "./player.js";
import Enemy from "./enemy.js";
import Tower from "./tower.js";
import Wall from "./wall.js";
import Cannon from "./cannon.js";
import Explosion from "./explosion.js";
import EventSystem from "./eventSystem.js";

class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = new Player(this, width / 2, height / 2);
    this.enemies = [];
    this.towers = [];
    this.walls = [];
    this.cannons = [];
    this.explosions = [];
    this.eventSystem = new EventSystem();
    this.gridSize = 50; // 그리드 크기 설정
    this.resources = 100; // 시작 자원
    this.baseHealth = 100; // 기지 체력
    this.buildMode = false; // 건설 모드
    this.previewX = 0;
    this.previewY = 0;

    this.initializeWalls();
    this.addEventListeners();
  }

  initializeWalls() {
    // 기지 근처에 장벽 설치
    const baseX = this.width / 2;
    const baseY = this.height / 2;
    const wallPositions = [
      { x: baseX - this.gridSize, y: baseY - this.gridSize },
      { x: baseX, y: baseY - this.gridSize },
      { x: baseX + this.gridSize, y: baseY - this.gridSize },
      { x: baseX - this.gridSize, y: baseY },
      { x: baseX + this.gridSize, y: baseY },
      { x: baseX - this.gridSize, y: baseY + this.gridSize },
      { x: baseX, y: baseY + this.gridSize },
      { x: baseX + this.gridSize, y: baseY + this.gridSize },
    ];

    wallPositions.forEach((pos) => {
      this.walls.push(new Wall(this, pos.x, pos.y));
    });
  }

  addEventListeners() {
    document
      .getElementById("buildTowerButton")
      .addEventListener("click", () => {
        this.player.build("Tower");
      });

    document.getElementById("buildWallButton").addEventListener("click", () => {
      this.player.build("Wall");
    });

    this.ctx.canvas.addEventListener("mousemove", (e) => {
      if (this.buildMode) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        this.previewX =
          Math.floor((e.clientX - rect.left) / this.gridSize) * this.gridSize +
          this.gridSize / 2;
        this.previewY =
          Math.floor((e.clientY - rect.top) / this.gridSize) * this.gridSize +
          this.gridSize / 2;
      }
    });

    this.ctx.canvas.addEventListener("click", (e) => {
      if (this.buildMode) {
        this.player.moveTo(this.previewX, this.previewY, () => {
          if (this.resources >= 50) {
            this.resources -= 50;
            if (this.player.buildType === "Tower") {
              this.towers.push(new Tower(this, this.previewX, this.previewY));
              this.eventSystem.log("Tower built");
            } else if (this.player.buildType === "Wall") {
              this.walls.push(new Wall(this, this.previewX, this.previewY));
              this.eventSystem.log("Wall built");
            }
            this.buildMode = false;
          }
        });
      }
    });
  }

  start() {
    this.spawnEnemy();
    this.gameLoop();
  }

  spawnEnemy() {
    setInterval(() => {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      this.enemies.push(new Enemy(this, x, y));
      this.eventSystem.log("Enemy spawned");
    }, 1000); // 1초마다 적 스폰
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.towers.forEach((tower) => tower.update());
    this.walls.forEach((wall) => wall.update());
    this.cannons.forEach((cannon) => cannon.update());
    this.explosions.forEach((explosion) => explosion.update());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.draw(this.ctx);
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    this.towers.forEach((tower) => tower.draw(this.ctx));
    this.walls.forEach((wall) => wall.draw(this.ctx));
    this.cannons.forEach((cannon) => cannon.draw(this.ctx));
    this.explosions.forEach((explosion) => explosion.draw(this.ctx));

    // 그리드 그리기
    for (let x = 0; x < this.width; x += this.gridSize) {
      for (let y = 0; y < this.height; y += this.gridSize) {
        this.ctx.strokeStyle = "#555";
        this.ctx.strokeRect(x, y, this.gridSize, this.gridSize);
      }
    }

    // 자원과 기지 체력 표시
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Resources: ${this.resources}`, 10, 20);
    this.ctx.fillText(`Base Health: ${this.baseHealth}`, 10, 50);

    // 건설 모드일 때 미리보기
    if (this.buildMode) {
      this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
      this.ctx.fillRect(
        this.previewX - this.gridSize / 2,
        this.previewY - this.gridSize / 2,
        this.gridSize,
        this.gridSize
      );
    }
  }
}

export default Game;
