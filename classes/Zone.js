class Zone{
    constructor(name, points, position, size, color = "#777777"){
        this.name = name;
        this.points = points;
        this.position = position;
        this.size = size;
        this.color = color;

        zones.push(this);
    }

    contains(checkPosition){
        let check = false;

        let xCheckRight = this.position.x + this.size.x > checkPosition.x;
        let xCheckLeft = this.position.x < checkPosition.x;
        let yCheckBottom = this.position.y + this.size.y > checkPosition.y;
        let yCheckTop = this.position.y < checkPosition.y

        if(xCheckRight && xCheckLeft && yCheckBottom && yCheckTop){
            check = true;
        }

        return check;
    }

    draw(){
        mainCtx.fillStyle = this.color;
        mainCtx.fillRect(this.position.x+GLOBAL_renderOffset.x, this.position.y+GLOBAL_renderOffset.y, this.size.x, this.size.y);
        
        mainCtx.font = "30px Arial";
        mainCtx.fillStyle = "#444444";
        mainCtx.fillText(this.name+" "+this.points, this.position.x+GLOBAL_renderOffset.x+20, this.position.y+GLOBAL_renderOffset.y+40);
    }
}