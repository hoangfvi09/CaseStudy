let gameArea = '';

class Main {
    lanes;
    obstacles;

    constructor() {
        this.lanes = []
        this.obstacles = []
    }

    createCar() {
        let car = new Car()
        gameArea += car.drawCar()
    }

    createObstacle() {
        for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
            this.obstacles.push(new Obstacle('obstacle' + i));
            gameArea += this.obstacles[i].drawObstacle();
        }
    }

    createLanes() {
        for (let i = 0; i < NUMBER_OF_LANES; i++) {
            this.lanes.push(new Lane(0, MAP_LEFT + i * LANE_WIDTH, i))
            gameArea += this.lanes[i].drawLane()
        }
        for (let i = 0; i < NUMBER_OF_LANES; i++) {
            this.lanes.push(new Lane(1, MAP_LEFT + i * LANE_WIDTH, (i + NUMBER_OF_LANES)))
            gameArea += this.lanes[i + NUMBER_OF_LANES].drawLane()
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
            document.getElementById("obstacle" + i).style.top = this.obstacles[i].top + 'px'
        }
    }
}

let game = new Main()
let numberObstacle = 0;
game.createObstacle()
game.createLanes()
game.createCar()
document.getElementById("gameArea").innerHTML = gameArea;
console.log(gameArea)

function drawAll() {
    game.moveLane();
    game.moveObstacle()
    requestAnimationFrame(drawAll);
}

drawAll()
