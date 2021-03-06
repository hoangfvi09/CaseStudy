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
    level;
    status;


    constructor() {
        this.lanes = []
        this.obstacles = []
        this.rewards = [];
        this.obstacleNo = 0;
        this.rewardNo = 0;
        this.playerScore = 0;
        this.lives = 3;
        this.puddles=[];
        this.puddleNo=0;
        this.level=1;
        this.status=true
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
        for (let i = 0; i < this.rewards.length; i++) {
            if (this.rewards[i].status === true) {
                gameArea += this.rewards[i].drawReward()
            }
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].status === true) {
                gameArea += this.obstacles[i].drawObstacle()
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

                if (((obstacleCoordinate.x === carCoordinate.x) && ((obstacleCoordinate.y + OBSTACLE_HEIGHT) > 30+carCoordinate.y))
                &&(obstacleCoordinate.y<(carCoordinate.y+0.8*CAR_HEIGHT))){
                    document.querySelector('.lose').classList.remove('hide')
                    document.querySelector('.loseALife').classList.remove('hide')

                    setTimeout(function (){
                        document.querySelector('.lose').classList.add('hide')
                        document.querySelector('.loseALife').classList.add('hide')
                    },500)

                    this.playerScore -= 50

                    this.lives--
                    crash.play()
                    if ((this.playerScore < 0) || (this.lives === 0)) {
                        endGame()

                    }else{
                        this.obstacles[i].status = false
                    }

                }
            }
        }
    }

    checkGainReward() {
        for (let i = 0; i < this.rewardNo; i++) {
            if (this.rewards[i].status === true) {
                let rewardCoordinate = document.getElementById('reward' + i).getBoundingClientRect()
                let carCoordinate = document.getElementById('car').getBoundingClientRect()
                if ((rewardCoordinate.x === carCoordinate.x) && ((rewardCoordinate.y + REWARD_HEIGHT) > carCoordinate.y)) {
                    document.querySelector('.gain').classList.remove('hide')
                    setTimeout(function (){
                        document.querySelector('.gain').classList.add('hide')
                    },500)

                    this.playerScore += 20
                    this.rewards[i].status = false
                    gainCoin.stop()
                    gainCoin.play()
                }

            }
        }
    }
    upDateScore(){
        document.getElementById("score").innerHTML='SCORE: '+this.playerScore
    }
    updateLives(){
        document.getElementById("lives").innerHTML='<img src="image/lives'+this.lives+'.png" style="width: 80%; margin: 0 10%; position: absolute" >'

    }
    updateLevel(){
        document.getElementById("level").innerHTML='LEVEL: '+this.level
        if(this.playerScore>=this.level*100){
            document.querySelector('.levelUp').classList.remove('hide')
            setTimeout(function (){
                document.querySelector('.levelUp').classList.add('hide')
            },500)
            this.level++
            background.speedUp()
            levelUp.play()
            goDownSpeed+=2
            for(let i=0;i<this.obstacles.length;i++){
                this.obstacles[i].speed+=2
            }
        }

    }
    pauseGame(){
        this.status=false
        document.querySelector('.PauseScreen').classList.remove('hide')
        background.stop()

    }
    resumeGame(){
        this.status=true
        drawAll()
        document.querySelector('.PauseScreen').classList.add('hide')
        background.play()
    }
}


let game = new Main()
document.querySelector(".loseALife").classList.add('hide')
document.querySelector(".lose").classList.add('hide')
document.querySelector(".gain").classList.add('hide')
document.querySelector('.GameOver').classList.add('hide')
document.querySelector('.levelUp').classList.add('hide')
document.querySelector('.PauseScreen').classList.add('hide')

function start(){
    document.querySelector(".StartScreen").classList.add("hide")
    game.createLanes()
    game.createCar()
    game.reDrawAll();
    background.play()
    background.loop()
    drawAll()
    addO();
    addR();
}
function replay(){
    location.reload()
}
function drawAll() {
    if(game.status===true){
        game.checkCollision()
        game.checkGainReward()
        game.moveLane();
        game.moveObstacle();
        game.moveReward();
        game.reDrawAll();
        game.upDateScore()
        game.updateLives()
        game.updateLevel()
        let drawAnimation;
        drawAnimation = requestAnimationFrame(drawAll);
    }
}
function endGame() {
    addHighScore()
    game.updateLives()
    game.upDateScore()
    game.updateLevel()
    document.querySelector('.GameOver').classList.remove('hide')
    background.stop()
    fail.play()
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
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            game.moveCarLeft();
            break;
        case 39:
            game.moveCarRight();
            break;
        case 32:
            game.pauseGame()
            break;
    }
}

function docReady() {
    window.addEventListener('keydown', moveSelection);
}
function resume(){
    game.resumeGame()
}