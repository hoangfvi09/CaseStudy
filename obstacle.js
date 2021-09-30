class Obstacle {
    top;
    left;
    src;
    score;

    constructor(id) {
        this.top = -OBSTACLE_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH
        this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.jpg'
        this.id = id
        this.core=-20
    }

    drawObstacle() {
        return '<img class="imgO" id="' + this.id + '" src="' + this.src + '" height="' + OBSTACLE_HEIGHT + '" width="' + OBSTACLE_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP+MAP_HEIGHT) {
            this.top = -OBSTACLE_HEIGHT / 2
            this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.jpg'
            this.left= MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH
        } else {
            this.top += OBSTACLE_SPEED
        }

    }
}