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
      this.img.src = 'images/hitchcock hunter.avif'

      this.bullets = []
      
    }
    shoot() {
      const x = this.x + this.w
      const y = this.y + this.h / 2
      const bullet = new Bullet(this.ctx, x, y)
      this.bullets.push(bullet)
    }
    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      )    
      this.bullets.forEach(b => b.draw())
    }
    move() {
      this.vx += this.ax
      this.vy += this.ay
      this.x += this.vx
      this.y += this.vy
    
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