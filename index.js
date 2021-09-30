let gameArea = '';

class Main {
    lanes;
    obstacles;
    obstacleNo;
    car;

    constructor() {
        this.lanes = []
        this.obstacles = []
        this.obstacleNo = 0;
        this.createObstacle();
    }

    createCar() {
        this.car = new Car('car')
        gameArea += this.car.drawCar()
    }

    // createObstacle() {
    //     for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
    //         this.obstacles.push(new Obstacle('obstacle' + i));
    //         gameArea += this.obstacles[i].drawObstacle();
    //     }
    // }
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
            gameArea += this.obstacles[i].drawObstacle()
        }
        gameArea += this.car.drawCar()
        document.getElementById("gameArea").innerHTML = gameArea
    }

    checkCollision() {
        for (let i = 0; i < this.obstacleNo; i++) {
            let obstacleCoordinate = document.getElementById('obstacle' + i).getBoundingClientRect()
            let carCoordinate = document.getElementById('car').getBoundingClientRect()
            if ((obstacleCoordinate.x === carCoordinate.x) && ((obstacleCoordinate.y + OBSTACLE_HEIGHT) > carCoordinate.y)) {
                endGame()
            }
        }
    }


}


let game = new Main()
game.createLanes()
game.createCar()
game.reDrawAll();

function endGame() {
    alert("Thua roi nha'")

    location.reload();
    cancelAnimationFrame(drawAnimation)
}

function drawAll() {
    game.moveLane();
    game.moveObstacle();
    game.checkCollision()
    game.reDrawAll();
    let drawAnimation;
    drawAnimation = requestAnimationFrame(drawAll);
}

function addO() {
    game.createObstacle();
    game.reDrawAll();
    setTimeout(addO, 1000);
}


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