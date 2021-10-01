class Obstacle {
    top;
    left;
    src;
    status;

    constructor(id) {
        this.top = -OBSTACLE_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH+40
        this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.png'
        this.id = id
        this.status=true;
    }

    drawObstacle() {
        return '<img class="imgO" id="' + this.id + '" src="' + this.src + '" height="' + OBSTACLE_HEIGHT + '" width="' + OBSTACLE_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP+MAP_HEIGHT) {
            this.status=true
            this.top = -OBSTACLE_HEIGHT
            this.src = 'image/obstacle' + Math.ceil(Math.random() * 3) + '.png'
            this.left= MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES)*LANE_WIDTH+40
        } else {
            this.top += OBSTACLE_SPEED
        }

    }
}