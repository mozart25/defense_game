import grass from "./images/grasstile.png";

export default class Map {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.tile = new Image();
    this.tile.src = grass; // 잔디 타일 이미지
  }

  draw() {
    const tileSize = 64;
    for (let x = 0; x < this.width; x += tileSize) {
      for (let y = 0; y < this.height; y += tileSize) {
        this.ctx.drawImage(this.tile, x, y, tileSize, tileSize);
      }
    }
  }
}
