class Boomerang {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = 20
    this.h = 50
    this.vx = 0
    this.vy = -7
    this.ax = 0
    this.ay = 0
    
    

    this.image = new Image ()
    this.image.src = 'assets/images/Boomerang 370px-35px.png'
    this.image.frames = 16
    this.image.frameIndex = 0
    this.tick = 0
    this.animate()
 }
      
  draw() {
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    this.ctx.drawImage(
    this.image,
    this.image.frameIndex * this.image.width / this.image.frames,
    0,
    this.image.width / this.image.frames,
    this.image.height,
    this.x,
    this.y,
    this.w,
    this.h
    )
    this.animate()
  }

  animate() {
    if (this.tick++ > 2) {
        this.tick = 0
        this.image.frameIndex++
    
    if (this.image.frameIndex > this.image.frames - 1) {
        this.image.frameIndex = 0
        }  
    }
  }
    
  move() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy
    }
}