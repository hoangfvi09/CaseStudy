class Obstacle {
    top;
    left;
    src;
    status;
    speed;

    constructor(id) {
        this.top = -OBSTACLE_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH
        this.src = 'image/obstacle' + Math.ceil(Math.random() * 4) + '.png'
        this.id = id
        this.status=true;
        this.speed= OBSTACLE_SPEED+Math.ceil(Math.random() * 2)
    }

    drawObstacle() {
        return '<img class="imgO" id="' + this.id + '" src="' + this.src + '" height="' + OBSTACLE_HEIGHT + '" width="' + OBSTACLE_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP+MAP_HEIGHT) {
            this.status=true
            this.top = -OBSTACLE_HEIGHT
            this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.png'
            this.left= MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH
        } else {
            this.top += this.speed
        }

    }
}