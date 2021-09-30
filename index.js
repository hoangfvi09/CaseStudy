let gameArea = '';

class Main {
    lanes;
    obstacles;
    obstacleNo;

    constructor() {
        this.lanes = []
        this.obstacles = []
        this.obstacleNo=0
    }

    createCar() {
        let car = new Car()
        gameArea += car.drawCar()
    }

    // createObstacle() {
    //     for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
    //         this.obstacles.push(new Obstacle('obstacle' + i));
    //         gameArea += this.obstacles[i].drawObstacle();
    //     }
    // }
    createObstacle(){
        if(this.obstacleNo<NUMBER_OF_OBSTACLES){
            this.obstacles.push(new Obstacle(('obstacle'+this.obstacleNo)))
            gameArea += this.obstacles[this.obstacleNo].drawObstacle();
            this.obstacleNo++
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
