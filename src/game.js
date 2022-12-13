class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
      this.bacground = new Background(ctx)
      this.hunter1 = new Hunter1(ctx) 
    }
    start() {
      this.initListeners()
      this.interval = setInterval(() =>{
      this.clear()
      this.draw()
      this.move()
     }, 1000 / 60)
    }

    draw() {
      this.bacground.draw();
      this.hunter1.draw();
    }

    move() {
      this.hunter1.move();
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
