const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const skyColor = '#83eefe'

const groundColor1 = '#f8c2b7'
const groundColor2 = '#ed988e'
const groundHeight = 30
const floorHeight = 15
const groundLineHeight = 2
const turfHeight = groundHeight + floorHeight + (groundLineHeight * 2)

const blueBlockColor = '#84c0ff'
const blueBlockAltColor = '#1290e4'
const pínkBlockColor = '#fdc4b6'
const pinkBLockAltColor = '#e79875'
const greenBlockColor = '#51d96b'
const nutColor = '#bbbfc3'

const coinBlockColor = '#fd9161'

const darkGreen = '#307528'
const lightGreen = '#54bb51'

ctx.fillStyle = skyColor
ctx.fillRect(0, 0, canvas.width, canvas.height)

function drawGround() {  
  ctx.fillStyle = groundColor2
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)
  
  ctx.fillStyle = 'black'
  ctx.fillRect(0, canvas.height - groundHeight - groundLineHeight, canvas.width, groundLineHeight)
  
  ctx.fillStyle = groundColor1
  ctx.fillRect(0, canvas.height - groundHeight - groundLineHeight - floorHeight, canvas.width, floorHeight)
  
  ctx.fillStyle = 'black'
  ctx.fillRect(0, canvas.height - groundHeight - floorHeight - (groundLineHeight * 2), canvas.width, groundLineHeight)
}

function drawBlock(x, width, height, color, altColor) {
  const blockY = canvas.height - turfHeight - height

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.roundRect(x + width - 4, blockY + 20, 25, height - 20, [0, 10, 0, 0])
  ctx.fill()
  
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.roundRect(x, blockY, width, height, 10)
  ctx.fill()

  ctx.lineWidth = 3
  ctx.stroke()
  ctx.lineWidth = 1

  ctx.fillStyle = altColor
  ctx.beginPath()
  ctx.roundRect(x + width - 8, blockY + 2, 7, height - 4, [0, 500, 500, 0])
  ctx.fill()

  ctx.beginPath()
  ctx.roundRect(x + 2, blockY + height - 8, width - 10, 7, [0, 0, 200, 500])
  ctx.fill()

  const radius = 8
  const nutOffset = radius + 5

  const nutCoords = [
    { x: x + nutOffset, y: blockY + nutOffset },
    { x: x + width - nutOffset, y: blockY + nutOffset },
    { x: x + nutOffset, y: blockY + height - nutOffset },
    { x: x + width - nutOffset, y: blockY + height - nutOffset}
  ]

  nutCoords.forEach(nut => {
    ctx.fillStyle = nutColor
    ctx.beginPath()
    ctx.arc(nut.x, nut.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(nut.x, nut.y)
    ctx.lineTo(nut.x - (radius - 2), nut.y + (radius - 2))
    ctx.lineTo(nut.x + (radius - 2), nut.y - (radius - 2))
    ctx.stroke()
  })
}

function drawCoinBlock(x, y, side) {
  ctx.fillStyle = coinBlockColor
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2

  ctx.fillRect(x, y, side, side)
  ctx.strokeRect(x, y, side, side)

  const offset = 5

  ctx.fillStyle = 'black'
  ctx.fillRect(x + offset, y + offset, 3, 3)
  ctx.fillRect(x + side - offset - 2, y + offset, 3, 3)
  ctx.fillRect(x + offset, y + side - offset - 2, 3, 3)
  ctx.fillRect(x + side - offset - 2, y + side - offset - 2, 3, 3)
}

async function drawPipe(x, height) {
  const pipeY = canvas.height - turfHeight - height

const enemy = new Image()
  const enemyWidth = 35
  const enemyHeight = 992 / 496 * enemyWidth

  enemy.src = "img/enemy.png"
  enemy.addEventListener('load', () => ctx.drawImage(enemy, x + 80 / 2 - enemyWidth / 2, pipeY - enemyHeight - 41, enemyWidth, enemyHeight))

  const stripes = [
    { c: darkGreen, w: 6 },
    { c: lightGreen, w: 2 },
    { c: darkGreen, w: 2 },
    { c: lightGreen, w: 8 },
    { c: darkGreen, w: 5 },
    { c: lightGreen, w: 2 },
    { c: darkGreen, w: 15 },
    { c: lightGreen, w: 2 },
    { c: darkGreen, w: 1 },
    { c: 'black', w: 4 },
    { c: darkGreen, w: 3 },
    { c: 'black', w: 2 },
    { c: darkGreen, w: 1 },
    { c: 'black', w: 10 },
    { c: darkGreen, w: 4 },
    { c: 'black', w: 11 },
  ]

  ctx.lineWidth = 2
  ctx.strokeRect(x, pipeY, 80, height)

  let offsetX = x + 1

  stripes.forEach(stripe => {
    ctx.fillStyle = stripe.c
    ctx.fillRect(offsetX, pipeY + 1, stripe.w, height - 2)
    offsetX += stripe.w
  })

  ctx.lineWidth = 3
  ctx.strokeRect(x - 3, pipeY - 40, 86, 40)

  offsetX = x - 2

  stripes[6].w = 21

  stripes.forEach(stripe => {
    ctx.fillStyle = stripe.c
    ctx.fillRect(offsetX, pipeY - 39, stripe.w, 38)
    offsetX += stripe.w
  })
}

drawGround()
drawBlock(300, 125, 200, blueBlockColor, blueBlockAltColor)
drawBlock(220, 125, 120, pínkBlockColor, pinkBLockAltColor)
drawBlock(680, 200, 120, greenBlockColor)
drawCoinBlock(150, 50, 50)
drawCoinBlock(202, 50, 50)
drawCoinBlock(50, 175, 50)
drawCoinBlock(735, 100, 50)
drawPipe(530, 90)

const mario = new Image()
const marioWidth = 35
const marioHeight = 972 / 504 * marioWidth

mario.src = "img/mario.png"
mario.addEventListener('load', () => ctx.drawImage(mario, 410, canvas.height - turfHeight - marioHeight, marioWidth, marioHeight))

const fire = new Image()
const fireWidth = 20
const fireHeight = 999 / 888 * fireWidth

fire.src = "img/fire.png"
fire.addEventListener('load', () => ctx.drawImage(fire, 460, canvas.height - turfHeight - 120, fireWidth, fireHeight))
