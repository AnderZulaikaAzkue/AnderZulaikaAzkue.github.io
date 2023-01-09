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
    this.birdsDeath = []
    this.points = 0;
    this.lifes = 3
    this.level = 1

    this.startMusic = new Audio('assets/sounds/forest birds.wav')
    this.startMusic.volume = 0.5

    this.killTheBirdSound = new Audio("assets/sounds/killTheBird.wav")
    this.killTheBirdSound.volume = 0.5

    this.killTheBird2Sound = new Audio("assets/sounds/bird2.wav")
    this.killTheBird2Sound.volume = 0.5

    this.levelChangeSound = new Audio("assets/sounds/levelChange.wav")
    this.levelChangeSound.volume = 0.5

    this.gameOverSound = new Audio("assets/sounds/gameOver.wav")
    this.gameOverSound.volume = 0.5

    this.lifeDeadSound = new Audio("assets/sounds/dfs.wav")
    this.lifeDeadSound.volume = 0.5
  }

  start() {
    this.stop()
    this.initListeners()
    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.checkCollisions()
      this.checkCollisionsBirds2()
      this.checkCollisionsHunter1()
      this.checkCollisionsHunter1Knife2()
      this.checkCollisionsHunter1BirdsDeath()
      this.move()
      this.addBirds()
      this.addBirds2()
      this.addBirdsDeath()
      this.score()
      this.showLifes()
      this.checkLevelChange()
      this.fall()
      this.win()
      this.startMusic.play()
      this.x = this.ctx.canvas.width
      this.y = Math.floor(Math.random() * 150) + 20
    }, 1000 / 60)

    setInterval(() => {
      this.knives.push(
        new Knife(this.ctx, this.x, this.y))
      this.birds.push(new Birds(this.ctx, this.x, this.y))
    }, 1000)

    setInterval(() => {
      if (this.points > 3) {
        this.knives2.push(
          new Knife2(this.ctx, this.x, this.y)
        )
        this.birds2.push(new Birds2(this.ctx, this.x, this.y))
      }
    }, 1000)

    setInterval(() => {
      if (this.points > 6) {
        this.birdsDeath.push(new BirdsDeath(this.ctx, this.x, this.y))
      }
    }, 1000)
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
    if (this.points > 3) {
      this.tick--
      if (this.tick <= 0) {
        this.tick = 75 + Math.random()
      }
    }
  }

  addBirdsDeath() {
    if (this.points > 6) {
      this.tick--
      if (this.tick <= 0) {
        this.tick = 75 + Math.random()
      }
    }
  }

  checkLevelChange() {
    if (this.points < 3) {
      this.level = 1
    } else {
      this.level = 2
      this.levelChangeSound.loop = false
      //this.levelChangeSound.play()
      //this.levelChangeSound.pause()
    }
    if (this.points > 6) {
      this.level = 3
      this.levelChangeSound.loop = false
      //this.levelChangeSound.play()
      //this.levelChangeSound.pause()
    }
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = 'center'
    this.ctx.fillText(`Level: ${this.level}`, 480, 25)
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
    this.birdsDeath.forEach(bd => bd.draw())
  }

  move() {
    this.hunter1.move();
    this.birds.forEach(b => b.move())
    this.birds2.forEach(b2 => b2.move())
    this.knives.forEach(k => k.move())
    this.knives2.forEach(k2 => k2.move())
    this.birdsDeath.forEach(bd => bd.move())
  }

  fall() {
    this.knives.forEach(k => k.fall())
    this.knives2.forEach(k2 => k2.fall())
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  checkCollisions() {
    this.hunter1.boomerangs.forEach(boomerang => {
      this.birds.some(bird => {
        var colXBird = boomerang.x < bird.x + bird.w && boomerang.x + boomerang.w > bird.x
        var colYBird = boomerang.y < bird.y + bird.h && boomerang.h + boomerang.y > bird.y
        if (colXBird && colYBird) {
          this.birds.splice(this.birds.indexOf(bird), 1);
          this.points++;
          this.killTheBirdSound.play();
          this.knives.some(knife => {
            let colXknives = boomerang.x < knife.x + knife.w && boomerang.x + boomerang.w > knife.x
            let colYKnives = boomerang.y < knife.y + knife.h && boomerang.h + boomerang.y > knife.y
            if (colXknives && colYKnives) {
              this.knives.splice(this.knives.indexOf(knife), 1);
              return true;
            }
          })
          return true;
        }
      })
    })
  }

  checkCollisionsBirds2() {
    this.hunter1.boomerangs.forEach(boomerang => {
      this.birds2.some(bird2 => {
        const colXBird2 = boomerang.x < bird2.x + bird2.w && boomerang.x + boomerang.w > bird2.x
        const colYBird2 = boomerang.y < bird2.y + bird2.h && boomerang.h + boomerang.y > bird2.y
        if (colXBird2 && colYBird2) {
          this.birds2.splice(this.birds2.indexOf(bird2), 1);
          this.points++;
          this.killTheBird2Sound.play()
          this.knives.some(knife => {
            let colXknives2 = boomerang.x < knife2.x + knife2.w && boomerang.x + boomerang.w > knife2.x
            let colYKnives2 = boomerang.y < knife2.y + knife2.h && boomerang.h + boomerang.y > knife2.y
            if (colXknives2 && colYKnives2) {
              this.knives2.splice(this.knives2.indexOf(knife2), 1);
              return true;
            }
          })
          return true;
        }
      })
    })
  }

  checkCollisionsHunter1() {
    const h = this.hunter1

    this.knives.forEach(k => {
      const colX = h.x < k.x + k.w && h.x + h.w > k.x
      const colY = h.y < k.y + k.w && h.y + h.w > k.y
      if (colX && colY) {
        this.knives.splice(this.knives.indexOf(k), 1)
        this.lifes -= 1
        this.lifeDeadSound.play()
      }
      if (this.lifes === 0) {
        this.gameOver()
      }
    })
  }

  checkCollisionsHunter1Knife2() {
    const h = this.hunter1

    this.knives2.forEach(k => {
      const colX = h.x < k.x + k.w && h.x + h.w > k.x
      const colY = h.y < k.y + k.w && h.y + h.w > k.y
      if (colX && colY) {
        this.knives2.splice(this.knives2.indexOf(k), 1)
        this.lifes -= 1
        this.lifeDeadSound.play()
      }
      if (this.lifes === 0) {
        this.gameOver()
      }
    })
  }

  checkCollisionsHunter1BirdsDeath() {
    const h = this.hunter1

    this.birdsDeath.forEach(k => {
      const colX = h.x < k.x + k.w && h.x + h.w > k.x
      const colY = h.y < k.y + k.w && h.y + h.w > k.y
      if (colX && colY) {
        this.birdsDeath.splice(this.birdsDeath.indexOf(k), 1)
        this.lifes -= 1
        this.lifeDeadSound.play()
      }
      if (this.lifes === 0) {
        this.gameOver()
      }
    })
  }

  gameOver() {
    clearInterval(this.interval)
    this.stop()
    this.startMusic.pause()
    this.img = new Image();
    this.img.src = 'assets/images/mainbackground.jpg'
    this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.font = "40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `GAME OVER
       Level: ${this.level}
       Score: ${this.points}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    this.lifeDeadSound.pause()
    this.gameOverSound.play()
  }

  win() {
    if (this.points > 50) {
      clearInterval(this.interval)
      this.stop()
      this.img = new Image();
      this.img.src = 'assets/images/mainbackground.jpg'
      this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = "40px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        `YOU WIN!
         Level: ${this.level}
         Score: ${this.points}`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );
    }
  }

  score() {
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Score: ${this.points}`, 20, 25)
  }

  showLifes() {
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "right";
    this.ctx.fillText(`Lives: ${this.lifes}`, 980, 25)
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