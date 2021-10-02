class Reward {
    top;
    left;

    constructor(id) {
        this.top = -REWARD_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        this.id = id

    }

    drawReward() {
        return '<img class="imgR" id="' + this.id + '" src="' + REWARD_SRC + '" height="' + REWARD_HEIGHT + '" width="' + REWARD_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'

    }

    moveDown() {
        if (this.top > MAP_TOP + MAP_HEIGHT) {
            this.status = true
            this.top = -REWARD_HEIGHT
            this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        } else {
            this.top += goDownSpeed
        }
    }
}