const container = document.querySelector(".container")

let playerLeftSpace = 50
let playerBottomSpace = 300

const player = document.createElement("div")

function createPlayer() {
    
   
    player.classList.add("player")

    player.style.bottom = playerBottomSpace + "px"
    player.style.left = ground[0].left

     container.appendChild(player)
    console.log("aa")
}

class Ground {
  constructor(newGroundBottom) {
    this.bottom = newGroundBottom
    this.left = Math.random() * 325
    this.visual = document.createElement("div")

    const visual = this.visual
    visual.classList.add("ground")
    visual.style.left = this.left + "px"
    visual.style.bottom = this.bottom + "px"
    container.appendChild(visual)
  }
}

createPlayer()

let groundCount = 5
let grounds = []

function createGround() {
        for(let i = 0; i < groundCount; i++) {
                let groundGap = 700 / groundCount
                let groundBottom = 100 + i * groundGap
                let ground = new Ground(groundBottom)
                grounds.push(ground)
        }
}


function moveGrounds() {
        if(playerLeftSpace > 200) {
             grounds.forEach(ground => {
                ground.bottom -= 5 
                let visual = ground.visual
                visual.style.bottom = ground.bottom + 'px'
             })
        }
}

let upTimerId
let downTimerId


function jump() {
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(() => {
            playerBottomSpace += 20;
            player.style.bottom = playerBottomSpace + "px"
    }, 30)
}

function fall() {
        clearInterval(upTimerId)
        downTimerId = setInterval(() => {
            playerBottomSpace -= 5;
            player.style.bottom = playerBottomSpace + "px"    
        }, 30);
        if(playerBottomSpace <= 0) {
            endTheGame()
        }

}


let isGameover = false 
function startGame() {
        if(!isGameover) {
            createPlayer()
            createGround()
            setInterval(moveGrounds(), 30 )
        }
}

function endTheGame() {
    isGameover = true 
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

startGame()