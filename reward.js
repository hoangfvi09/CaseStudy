class Reward {
    top;
    left;
    src;
    score;
    status;

    constructor(id) {
        this.top = -REWARD_HEIGHT
        this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        this.src = 'https://media.giphy.com/media/l0JM83bF1jbRsTnNu/giphy.gif?cid=ecf05e47m1g4tl9zuzu2o4hbjh68fenv6mpm1vnxeqylzh62&rid=giphy.gif&ct=g'
        this.id = id
        this.score=5;
        this.status=true;
    }

    drawReward() {
        return '<img class="imgO" id="' + this.id + '" src="' + this.src + '" height="' + REWARD_HEIGHT + '" width="' + REWARD_WIDTH + '" style="position:absolute;left:' + this.left + 'px; top:' + this.top + 'px"/>'
    }

    moveDown() {
        if (this.top > MAP_TOP + MAP_HEIGHT) {
            this.top = -REWARD_HEIGHT / 2
            this.left = MAP_LEFT + Math.floor(Math.random() * NUMBER_OF_LANES) * LANE_WIDTH
        } else {
            this.top += REWARD_SPEED
        }

    }
}