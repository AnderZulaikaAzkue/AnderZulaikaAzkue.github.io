class Birds {
  constructor( ctx, x, y) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.y = Math.floor(Math.random() * 150) + 20
    this.w = 50
    this.h = 50
    this.vx = -1.5
    this.img = new Image()
    this.img.src = "images/Bird 200px 50px.png"
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0
    this.animate()
  }

  draw() {
    this.ctx.drawImage(
    this.img,
    this.img.frameIndex * this.img.width / this.img.frames,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
    )
    this.animate()
  }

  animate() {
    if (this.tick++ > 8) {
       this.tick = 0
       this.img.frameIndex++

    if (this.img.frameIndex > this.img.frames - 1) {
       this.img.frameIndex = 0
      }
    }
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return (
      this.x < this.ctx.canvas.width * 2 &&
      this.x > 0 - this.ctx.canvas.width
    )
  }
  

}