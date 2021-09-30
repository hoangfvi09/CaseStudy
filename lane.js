class Lane {
    top;
    left;
    speed;
    src
    width;
    height;

    constructor(laneNo, left, id) {
        this.top = MAP_TOP + laneNo * MAP_HEIGHT;
        this.left = left;
        this.speed = OBSTACLE_SPEED;
        this.src = LANE_SRC;
        this.width = LANE_WIDTH;
        this.height = MAP_HEIGHT
        this.id = 'lane' + id
    }
    moveDown() {
        if (this.top > MAP_TOP + MAP_HEIGHT) {
            this.top = MAP_TOP - MAP_HEIGHT
        } else {
            this.top += this.speed
        }
    }

    drawLane() {
        return '<img class="imgL" id="' + this.id + '" src="' + this.src + '" height="' + this.height + '" width="' + this.width + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

}