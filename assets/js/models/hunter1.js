class Hunter1 {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 50
    this.y = 300
    this.w = 40
    this.h = 100
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
  
    this.img = new Image()
    this.img.src = 'assets/images/hitchcock hunter.avif'

    this.boomerangs = []
  }

  
  shoot() { 
    const x = this.x + this.w
    const y = this.y + this.h / 2
    const boomerang = new Boomerang(this.ctx, x, y)
    this.boomerangs.push(boomerang)
    }
    
  draw() {
    this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
    )       
    this.boomerangs.forEach(b => b.draw())
  }
  move() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy
    this.boomerangs.forEach(b => b.move())
    
    if (this.y >= this.y0) {
        this.y = this.y0
        this.vy = 0
      }
    
    if (this.x <= 0) {
        this.vx = 0
        this.x = 0
      }
    
    if (this.x + this.w >= this.ctx.canvas.width) {
        this.vx = 0
        this.x = this.ctx.canvas.width - this.w
      }  
    }
   
  onKeyDown(key) {
    switch(key) {
      case RIGHT:
        this.vx = 3
          break;
      case LEFT:
        this.vx = -3
          break;
      case SPACE:
        this.shoot()
          break;
    }
  }
    
  onKeyUp(key) {
    switch(key) {
      case RIGHT:
      case LEFT:
        this.vx = 0
        break;
    }
  }    
}