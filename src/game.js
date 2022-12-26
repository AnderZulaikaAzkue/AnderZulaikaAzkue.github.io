class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.tick = 60 * 5
    this.background = new Background(ctx)
    this.hunter1 = new Hunter1(ctx) 
    this.birds = []
    this.boomerangs = []
    this.knives = []
    this.points = 0;
    this.lifes = 3
    

  }

  start() {
    this.initListeners()
    this.interval = setInterval(() =>{
    this.clear()
    this.draw()
    this.checkCollisions()
    this.checkCollisionsHunter1()
    this.move()
    this.addBirds()
    this.score()
    this.showLifes()
    this.fall()
    this.x = this.ctx.canvas.width
    this.y = Math.floor(Math.random() * 150) + 20
     }, 1000 / 60) 

   setInterval(()=>{
    this.knives.push(
      new Knife(this.ctx, this.x, this.y)
      
      
    )
     this.birds.push(new Birds(this.ctx, this.x, this.y))
   },1000 ) 
  }  

  clearBirds() {
    this.birds = this.birds.filter(b => b.isVisible())
  }

  addBirds() {
    this.tick--

   if (this.tick <=0) {
    this.tick = 75 + Math.random()
   
   }
  }
  stop() {
    clearInterval(this.interval)
  }
 
  draw() {
    this.background.draw();
    this.hunter1.draw();
    this.birds.forEach(b => b.draw())
    this.knives.forEach(k => k.draw())
  }

  move() {
    this.hunter1.move();
    this.birds.forEach(b => b.move())
    this.knives.forEach(k => k.move())
  }

  
  fall(){
    this.knives.forEach(k => k.fall())
    
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
          this.birds.splice(this.birds.indexOf(bird), 1);
          this.points++;
          return true;
          }
      })
    })
  }

  checkCollisionsHunter1(){
    const h = this.hunter1

    this.knives.forEach(k => {
      const colX = h.x < k.x + k.w && h.x + h.w > k.x
      const colY = h.y < k.y + k.w && h.y + h.w > k.y
      if (colX && colY) {
        this.knives.splice(1)
        this.lifes -= 1
    }
  })
  }
  

  score(){
    this.ctx.font = '30px Luckiest Guy'
    this.ctx.fillStyle = "black"
    this.ctx.fillText(`Score: ${this.points}`, 20, 20)
  }

  showLifes(){
    this.ctx.font = '30px luckiest Guy'
    this.ctx.fillStyle = "black"
    this.ctx.fillText(`Lives: ${this.lifes}`, 680, 20)
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