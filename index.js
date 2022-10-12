const container = document.querySelector(".container")

let playerLeftSpace = 50
let startingPoint = 150
let playerBottomSpace = startingPoint


const player = document.getElementsByClassName("player")[0]


function createPlayer() {
    
   
    player.classList.add("player")

    player.style.bottom = playerBottomSpace + "px"
    player.style.left = grounds[0].left

     container.appendChild(player)
    console.log("aa")
}

class NFT {
    constructor(newNftBottom){
        this.bottom = newNftBottom
            // game width is 400 and ground width is 75  400-75=325
        this.left = Math.random() * 325
        this.visual = document.createElement("div")

        const visual = this.visual 
        visual.classList.add("nft")
        visual.style.left = this.left + "px"
    }
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

                if(ground.bottom < 10 ) {
                    let groundOne = grounds[0].visual
                    groundOne.classList.remove("ground")
                    grounds.shift()
                    console.log(grounds)
                    let newGround = new Ground(700)
                    grounds.push(newGround)
                }
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
            if(playerBottomSpace > startingPoint + 200) {
                fall()
            }
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
            if(
                (playerBottomSpace >= 0) &&
                (playerBottomSpace <= + 15) &&
                ((playerLeftSpace + 50) >= ground.left) &&
                (playerLeftSpace <= (ground.left + 75)) &&
                (!isJumping)
            ) {
                    jump()
                    startingPoint + playerBottomSpace
            }
}

window.nftScore = 0
function checkIfCollectNft() {
    let nft = nfts[0]
    if(
        playerBottomSpace >= nft.bottom &&
        playerBottomSpace <= nft.bottom + 50 &&
        ((playerLeftSpace + 50) >= nft.left) &&
        playerLeftSpace <= nft.left + 50 
    ) {
        console.log("COLLISION")
        window.nftscore += 1
        let nftOne = nfts[0].visual 
        nftOne.classList.remove("nft")
        nfts.shift()

        let newNFT = new NFT(580)
        
    }
}

let score = 0 
let grid = document.getElementsByClassName("grid-container")[0]
let scoreElement = document.getElementById('score')
let nftScoreElement = document.getElementById("nftscore")


function endTheGame() {

    isGameover = true
    loadImagesOfMintedNfts()
    grounds.forEach(ground => {
        let groundOne = ground.visual
        groundOne.classList.remove("ground")
    })
     grounds = []
     nfts.forEach(nft => {
        let nftOne = nft.visual
        nftOne.classList.remove("nft")
     })
     player.classList.add("hide")
     grid.classList.remove("hide")
     scoreElement.innerText = "Score: " + score
     nftScoreElement.innerText = "NFT score :" + window.nftScore
    
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}


function moveGrounds() {
    if(playerBottomSpace > 200) {
        grounds.forEach(ground => {
            ground.bottom -= 5
            let.visual = ground.visual 
            visual.style.bottom = ground.bottom + "px"

            if(ground.bottom < 10) {
                let groundOne = grounds[0].visual
                groundOne.classList.remove("ground")
                grounds.shift()
                let newGround = new Ground(700)
                grounds.push(newGround)
            }
        })
    }
}

let nfts = [new NFT(500)]
function moveNFTs() {

        if(playerBottomSpace > 200) {
            nfts.forEach(nft => {
                nft.bottom -= 4
                let visual = nft.visual
                visual.style.bottom = nft.bottom +"px"

                if(nft.bottom < 10) {
                    let nftOne = nfts[0].visual
                    nftOne.classList.remove("nft")
                    nfts.shift()

                    let newNFT = new NFT(580)
                    nfts.push(newNFT)
                }
            })
        }




}



let isGameover = false 

function startGame() {
        if(!isGameover) {
            createPlayer()
            createGround()
            setInterval(moveGrounds(), 30 )
            setInterval(moveNFTs, 30 )
            jump()
            document.addEventListener("keyup" , onKeyPress)

        }
}

function loadImagesOfMintedNfts() {
    for(let i = 1; i <= 10; i++) {
        if(localStorage.getItem(i.toString())) {
            console.log(`element with id ${i} is minted`)
            const nft1 = document.getElementById(i)
            const att = document.createAttribute("style")
            att.value = `content:url(./skins/${i}.png)`
            nft1.setAttributeNode(att);
        }
    }
}

function endTheGame() {
    isGameover = true 
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

function onKeyPress(event) {
    if (event.key === "ArrowLeft") {
            moveLeft()
    } else if(event.key === "ArrowRight") {
            moveRight()
} else if(event.key === "ArrowUp") {
            stopMoving()
    }
}

function stopMoving() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
}

let isGoingLeft
let isGoingRight
let leftTimerId
let rightTimerId

function moveLeft() {
        if(isGoingRight) {
             clearInterval(rightTimerId)
             isGoingRight = false
        }  
        isGoingLeft = true
        leftTimerId = setInterval(() => {
            if(playerLeftSpace >= 0) {
                playerLeftSpace -= 5
                player.style.left = playerLeftSpace + "px"
            }

        }, 30); 
}

function moveRight() {
    if(isGoingLeft) {
        clearInterval(leftTimerId)
        isGoingLeft = false

    }
    isGoingRight = true
    rightTimerId = setInterval (() => {
        if(playerLeftSpace <= 450 ) {
            playerLeftSpace += 5
            player.style.left = playerLeftSpace + 'px'
        } else {
            moveLeft()
        }

    }, 30);
}


startGame()