const container = document.querySelector(".container")

let playerLeftSpace = 50
let playerBottomSpace = 150

const player = document.createElement("div")

function createPlayer() {
    
   
    player.classList.add("player")

    player.style.bottom = playerBottomSpace + "px"
    player.style.left = playerLeftSpace + "px"

     container.appendChild(player)
    console.log("aa")
}

class Ground {
  constructor(newGroundBottom) {
    this.bottom = newGroundBottom
    this.left = Math.random() * 425
  }
}

createPlayer()