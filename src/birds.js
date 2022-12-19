class Birds {
  constructor( ctx, x, y) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.y = Math.floor(Math.random() * 150) + 20
    this.w = 50
    this.h = 50
    this.vx = -1.5
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.img = new Image()
    this.img.src = "images/Bird 200px 50px.png"
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0
    this.animate()
    this.setInterval = 0
    this.knifes = []
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
    this.knifes.forEach(k => k.draw())
  }

  addKnife() {
    this.knifes--

   if (this.knifes <=0) {
    this.knifes = 75 + Math.random()
    this.knifes.push(new Knife(this.ctx))
   }
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
    this.knifes.forEach(k => k.move())
  }

  isVisible() {
    return (
      this.x < this.ctx.canvas.width * 2 &&
      this.x > 0 - this.ctx.canvas.width
    )
  }
   
}
