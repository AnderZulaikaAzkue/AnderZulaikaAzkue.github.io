class Birds2 {
    constructor( ctx, x, y) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.w = 50
      this.h = 50
      this.vx = -4
      this.vy = 0
      this.ax = 0
      this.ay = 0
      this.img = new Image()
      this.img.src = "assets/images/birds2.png"
      this.img.frames = 4
      this.img.frameIndex = 0
      this.tick =  60 * 5
      this.animate()
      this.knives = []
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
      this.vx += this.ax
      this.vy += this.ay
      this.x += this.vx
      this.y += this.vy
    } 
  }