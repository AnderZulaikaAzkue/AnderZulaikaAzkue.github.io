class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 60 * 5
    this.background = new Background(ctx)
    this.hunter1 = new Hunter1(ctx) 
    this.birds = []
    this.boomerangs = []
  }

  start() {
    this.initListeners()
    this.interval = setInterval(() =>{
    this.clear()
    this.draw()
    this.checkCollisions()
    this.move()
    this.addBirds()
     }, 1000 / 60) 
  }  
  
  clearBirds() {
    this.birds = this.birds.filter(b => b.isVisible())
  }

  addBirds() {
    this.tick--

   if (this.tick <=0) {
    this.tick = 75 + Math.random()
    this.birds.push(new Birds(this.ctx))
   }
  }
  stop() {
    clearInterval(this.interval)
  }

  draw() {
    this.background.draw();
    this.hunter1.draw();
    this.birds.forEach(b => b.draw())
  }

  move() {
    this.hunter1.move();
    this.birds.forEach(b => b.move())
  }

  clear(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
 
  checkCollisions() {
    this.hunter1.boomerangs.forEach(boomerang => {
      this.birds.some(bird => {
        const colX = boomerang.x < bird.x + bird.w && boomerang.x + boomerang.w > bird.x
        const colY = boomerang.y < bird.y + bird.h && boomerang.h + boomerang.y > bird.y
        if (colX && colY) {
          this.gameOver()
          }
      })
    })
  }
 
  
  initListeners() {
    document.onkeydown = (e) => {
      this.hunter1.onKeyDown(e.keyCode)
      }
  
    document.onkeyup = (e) => {
      this.hunter1.onKeyUp(e.keyCode)
      }
  }

  gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
  gameOver() {
    this.stop()
  }
}
