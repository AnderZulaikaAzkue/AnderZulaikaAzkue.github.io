class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.tick = 60 * 5
    this.background = new Background(ctx)
    this.hunter1 = new Hunter1(ctx) 
    this.birds = []
    this.birds2 = []
    this.boomerangs = []
    this.knives = []
    this.knives2 = []
    this.points = 0;
    this.lifes = 3
    this.level = 2

    this.killTheBirdSound = new Audio("assets/sounds/killTheBird.wav")
    this.killTheBirdSound.volume = 0.5
  }

  start() {
    this.stop()
    this.initListeners()
    this.interval = setInterval(() =>{
    this.clear()
    this.draw()
    this.checkCollisions()
    this.checkCollisionsBirds2()
    this.checkCollisionsHunter1()
    this.move()
    this.addBirds()
    this.addBirds2()
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

   setInterval(()=>{
    this.knives2.push(
      new Knife2(this.ctx, this.x, this.y)  
    )
     this.birds2.push(new Birds2(this.ctx, this.x, this.y))
   },1000 ) 
  }  

  clearBirds() {
    this.birds = this.birds.filter(b => b.isVisible())
  }
  clearBirds2() {
    this.birds2 = this.birds2.filter(b2 => b2.isVisible())
  }

  addBirds() {
    this.tick--
   if (this.tick <= 0) {
    this.tick = 75 + Math.random()
   }
  }

  addBirds2() {
    this.tick--
   if (this.tick <= 0) {
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
    this.birds2.forEach(b2 => b2.draw())
    this.knives.forEach(k => k.draw())
    this.knives2.forEach(k2 => k2.draw())
  }

  move() {
    this.hunter1.move();
    this.birds.forEach(b => b.move())
    this.birds2.forEach(b2 => b2.move())
    this.knives.forEach(k => k.move())
    this.knives2.forEach(k2 => k2.move())
  }

  fall(){
    this.knives.forEach(k => k.fall())
    this.knives2.forEach(k2 => k2.fall())
    
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
          this.killTheBirdSound.play()
          return true;
          }
      })
    })
  }
  checkCollisionsBirds2() {
    this.hunter1.boomerangs.forEach(boomerang => {
      this.birds2.some(bird2 => {
        const colX = boomerang.x < bird2.x + bird2.w && boomerang.x + boomerang.w > bird2.x
        const colY = boomerang.y < bird2.y + bird2.h && boomerang.h + boomerang.y > bird2.y
        if (colX && colY) {
          this.birds2.splice(this.birds2.indexOf(bird2), 1);
          this.points++;
          this.killTheBirdSound.play()
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
    if (this.lifes === 0){
      this.gameOver()
    }
  })
  }

  gameOver() {
    clearInterval(this.interval)
    this.stop()
    this.img = new Image();
    this.img.src = 'assets/images/alfred-hitchcock-birds-3.jpg'

    this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `GAME OVER
       Score: ${this.points}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    
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