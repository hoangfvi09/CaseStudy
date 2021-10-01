let gameArea = '';

class Main {
    lanes;
    obstacles;
    obstacleNo;
    car;
    rewardNo;
    rewards;
    playerScore;
    lives;
    puddles;
    puddleNo;


    constructor() {
        this.lanes = []
        this.obstacles = []
        this.rewards = [];
        this.obstacleNo = 0;
        this.rewardNo = 0;
        this.playerScore = 0;
        this.lives = 5;
        this.puddles=[];
        this.puddleNo=0;
    }

    createCar() {
        this.car = new Car('car')
        gameArea += this.car.drawCar()
    }

    createObstacle() {
        if (this.obstacleNo < NUMBER_OF_OBSTACLES) {
            this.obstacles.push(new Obstacle(('obstacle' + this.obstacleNo)))
            this.obstacleNo++;
        }
    }

    createLanes() {
        for (let i = 0; i < NUMBER_OF_LANES; i++) {
            this.lanes.push(new Lane(0, MAP_LEFT + i * LANE_WIDTH, i))
        }
        for (let i = 0; i < NUMBER_OF_LANES; i++) {
            this.lanes.push(new Lane(1, MAP_LEFT + i * LANE_WIDTH, (i + NUMBER_OF_LANES)))
        }
    }

    createReward() {
        if (this.rewardNo < NUMBER_OF_REWARDS) {
            this.rewards.push(new Reward(('reward' + this.rewardNo)))
            this.rewardNo++;
        }
    }
    createPuddle() {
        if (this.puddleNo < NUMBER_OF_PUDDLE) {
            this.puddles.push(new Puddle('puddle' + this.puddleNo))
            this.puddleNo++;
        }
    }

    moveLane() {
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].moveDown()
            document.getElementById("lane" + i).style.top = this.lanes[i].top + 'px'
        }
    }

    moveObstacle() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].moveDown()
        }
    }

    moveReward() {
        for (let i = 0; i < this.rewards.length; i++) {
            this.rewards[i].moveDown()
        }
    }
    movePuddle() {
        for (let i = 0; i < this.puddles.length; i++) {
            this.puddles[i].moveDown()
        }
    }

    moveCarLeft() {
        this.car.moveLeft()
        document.getElementById("car").style.left = this.car.left + 'px'
    }

    moveCarRight() {
        this.car.moveRight()
        document.getElementById("car").style.left = this.car.left + 'px'
    }

    reDrawAll() {
        let gameArea = ''
        for (let i = 0; i < this.lanes.length; i++) {
            gameArea += this.lanes[i].drawLane()
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].status === true) {
                gameArea += this.obstacles[i].drawObstacle()
            }
        }
        for (let i = 0; i < this.rewards.length; i++) {
            if (this.rewards[i].status === true) {
                gameArea += this.rewards[i].drawReward()
            }
        }
        for (let i = 0; i < this.puddles.length; i++) {

                gameArea += this.puddles[i].drawPuddle()

        }

        gameArea += this.car.drawCar()
        document.getElementById("gameArea").innerHTML = gameArea
    }

    checkCollision() {
        for (let i = 0; i < this.obstacleNo; i++) {
            if (this.obstacles[i].status === true) {
                let obstacleCoordinate = document.getElementById('obstacle' + i).getBoundingClientRect()
                let carCoordinate = document.getElementById('car').getBoundingClientRect()

                if ((obstacleCoordinate.x === carCoordinate.x) && ((obstacleCoordinate.y + OBSTACLE_HEIGHT) > carCoordinate.y)) {
                    this.playerScore -= 50
                    this.obstacles[i].status = false
                    this.lives--
                    if ((this.playerScore < 0) || (this.lives === 0)) {
                        endGame()

                    }

                }
            }
        }
    }
    // checkOverlap(){
    //     for(let i=0;i<this.obstacles.length;i++){
    //         for(let j=0;j<=this.rewards.length;j++){
    //             let
    //         }
    //     }
    // }

    checkGainReward() {
        for (let i = 0; i < this.rewardNo; i++) {
            if (this.rewards[i].status === true) {
                let rewardCoordinate = document.getElementById('reward' + i).getBoundingClientRect()
                let carCoordinate = document.getElementById('car').getBoundingClientRect()
                if ((rewardCoordinate.x === carCoordinate.x) && ((rewardCoordinate.y + REWARD_HEIGHT) > carCoordinate.y)) {
                    this.playerScore += 20
                    this.rewards[i].status = false
                }

            }
        }
    }
    upDateScore(){
        document.getElementById("score").innerHTML='SCORE: '+this.playerScore
    }
    updateLives(){
        document.getElementById("lives").innerHTML='LIVES: '+this.lives
    }
}


let game = new Main()
game.createLanes()
game.createCar()
game.reDrawAll();

function drawAll() {
    game.checkCollision()
    game.checkGainReward()
    game.moveLane();
    game.moveObstacle();
    game.moveReward();
    // game.movePuddle()
    game.reDrawAll();
    game.upDateScore()
    game.updateLives()
    let drawAnimation;
    drawAnimation = requestAnimationFrame(drawAll);
}
function endGame() {
    alert("Thua roi nha'")

    location.reload();
    cancelAnimationFrame(drawAnimation)
}

function addO() {
    game.createObstacle();
    game.reDrawAll();
    setTimeout(addO, 1900);
}

function addR() {
    game.createReward();
    game.reDrawAll();
    setTimeout(addR, 3400);
}
// function addM() {
//     game.createPuddle();
//     game.reDrawAll();
//     setTimeout(addM, 3000);
// }


// key event
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            game.moveCarLeft();
            break;
        case 39:
            game.moveCarRight();
            break;
    }
}

function docReady() {
    window.addEventListener('keydown', moveSelection);
}

drawAll()
addO();
addR();
// addM();