class Puddle {
    top;
    left;

    constructor(id) {
        this.top = -PUDDLE_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        this.id = id
    }

    drawPuddle() {
        return '<img class="imgO" id="' + this.id + '" src="' + PUDDLE_SRC + '" height="' + PUDDLE_HEIGHT + '" width="' + PUDDLE_WIDTH+ '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP + MAP_HEIGHT) {
            this.top = -PUDDLE_HEIGHT
            this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        } else {
            this.top += PUDDLE_SPEED
        }

    }
}

