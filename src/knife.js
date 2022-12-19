class Knife {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = 20
        this.h = 50
        this.vx = 0
        this.vy = 7
        this.ax = 0
        this.ay = 0

        this.img = new Image()
        this.img.src = 'images/hitchcock first page.png'
    }     
    draw() {
      this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h,
      )  
    }

    move() {
      this.vx += this.ax
      this.vy += this.ay
      this.x += this.vx
      this.y += this.vy
        }
   
}