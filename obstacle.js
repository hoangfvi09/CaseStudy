class Obstacle {
    top;
    left;
    src;

    constructor(id) {
        this.top = -CAR_HEIGHT / 2
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH
        this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.jpg'
        this.id = id
    }

    drawObstacle() {
        console.log(this.id)
        return '<img class="imgO" id="' + this.id + '" src="' + this.src + '" height="' + OBSTACLE_HEIGHT + '" width="' + OBSTACLE_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP+MAP_HEIGHT) {
            this.top = -CAR_HEIGHT / 2
            this.src = 'obstacle' + Math.ceil(Math.random() * NUMBER_OF_OBSTACLES) + '.png'
        } else {
            this.top += OBSTACLE_SPEED
        }

    }
}