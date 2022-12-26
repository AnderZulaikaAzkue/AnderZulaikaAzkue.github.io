const ctx = document.getElementById('canvas').getContext('2d')
const game = new Game(ctx)

const btn = document.getElementById("start-btn")
btn.onclick = () => {
  const welcome = document.getElementById("welcome")
  welcome.remove()
  canvas.style.display = 'block'
  game.start()
}