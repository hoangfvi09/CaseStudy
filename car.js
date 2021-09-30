
class Car {
    left;
    id;
    constructor(id){
        this.left=MAP_LEFT+40;
        this.id=id;
    }
    drawCar(){
        return '<img class ="imgC" id="' + this.id + '" src="' + CAR_SRC + '" height="'+CAR_HEIGHT+'" width="'+CAR_WIDTH+'" style="position:absolute;left:' + this.left + 'px; top:' + CAR_TOP + 'px;"/>'
    }
    moveRight(){
        if(this.left<MAP_LEFT+40+ LANE_WIDTH*(NUMBER_OF_LANES-1)){
            this.left+=CAR_SPEED;
        }

    }
    moveLeft(){
        if(this.left>=MAP_LEFT+40+LANE_WIDTH){
            this.left-=CAR_SPEED;
        }

    }
}
