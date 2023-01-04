class BirdsDeath {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = Math.floor(Math.random() * 1000) + 0
        this.y = y
        this.w = 60
        this.h = 60
        this.vx = 0
        this.vy = 4
        this.ax = 0
        this.ay = 0
        this.img = new Image()
        this.img.src = 'assets/images/Bird 50px 50px.png'
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