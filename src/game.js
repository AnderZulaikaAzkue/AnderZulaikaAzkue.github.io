class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0
    this.background = new Background(ctx)
    this.hunter1 = new Hunter1(ctx) 
    this.birds = []
  }

  start() {
    this.initListeners()
    this.interval = setInterval(() =>{
    this.clear()
    this.draw()
    this.move()
    this.addBirds()
     }, 1000 / 60)
  }  
  
  clearBirds() {
    // TODO: filter only visible obstacles (call o.isVisible())
    this.birds = this.birds.filter(o => o.isVisible())
  }

  addBirds() {
    // TODO: add new Obstacle every 100 ticks
    this.tick--

   if (this.tick <=0) {
    this.tick = 100 + Math.random()
    this.birds.push(new Birds(this.ctx))
   }
  }

  draw() {
    this.background.draw();
    this.hunter1.draw();
    this.birds.forEach(o => o.draw())
  }

  move() {
    this.hunter1.move();
    this.birds.forEach(o => o.move())
  }

  clear(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.hunter1.onKeyDown(e.keyCode)
      }
  
    document.onkeyup = (e) => {
      this.hunter1.onKeyUp(e.keyCode)
      }
  }
}
