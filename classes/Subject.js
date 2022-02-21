class Subject{
    constructor(id){
        this.id = id;
        this.connectors = [];
        this.fixators = [];
        this.program = [];
        this.programPointer = 0;
        this.position = new Vect2d(0, 0);
        this.points = 0;

        //subjects.push(this);
    }

    addFixator(position){
        this.fixators.push(new Fixator(position));
    }

    addConnector(fixator1, fixator2){
        this.connectors.push(new Connector(fixator1, fixator2));
    }

    connectorExists(fixator1, fixator2){
        for(let c = 0; c < this.connectors.length; c++){
            let connector = this.connectors[c];
            if((connector.fixator1 == fixator1 && connector.fixator2 == fixator2) ||(connector.fixator1 == fixator2 && connector.fixator2 == fixator1)){
                return true;
            }
        }
        return false;
    }

    removeFixator(id){
        this.fixators.splice(id, 1);
    }

    removeConnector(id){
        this.connectors.splice(id, 1);
    }

    update(){
        if(this.programPointer < this.program.length){
            this.executeCommand(this.program[this.programPointer]);
            this.programPointer++;
        }else{
            this.executeCommand(this.program[0]);
            this.programPointer = 1;
        }

        //Currently the position is equal to the first fixator position
        this.position = this.fixators[0].position;
    }

    executeCommand(command){
        let order = command[0];
        let number = command[1];

        if(order == "F"){ //Fixate
            this.fixators[number].fixate();
        }else if(order == "L"){ //Loosen
            this.fixators[number].loosen();
        }else if(order == "E"){ //Extend
            this.connectors[number].extend();
        }else if(order == "C"){ //Contract
            this.connectors[number].contract();
        }
    }

    executeProgram(program){
        for(let c = 0; c < program.length; c++){
            this.executeCommand(program[c]);
        }

        console.log("Subject #"+this.id+" executed program "+program);
    }

    draw(){
        if(draw){
            for(let c = 0; c < this.connectors.length; c++){
                let connector = this.connectors[c];

                mainCtx.lineWidth = 3;
                mainCtx.beginPath();
                mainCtx.arc(connector.fixator1.position.x+GLOBAL_renderOffset.x, connector.fixator1.position.y+GLOBAL_renderOffset.y, GLOBAL_fixatorRadius, 0, 2*Math.PI);
                if(connector.fixator1.isFixated){
                    mainCtx.strokeStyle = "#FF0000";
                }else{
                    mainCtx.strokeStyle = "#000000";
                }
                mainCtx.stroke();
                mainCtx.beginPath();
                mainCtx.arc(connector.fixator2.position.x+GLOBAL_renderOffset.x, connector.fixator2.position.y+GLOBAL_renderOffset.y, GLOBAL_fixatorRadius, 0, 2*Math.PI);
                if(connector.fixator2.isFixated){
                    mainCtx.strokeStyle = "#FF0000";
                }else{
                    mainCtx.strokeStyle = "#000000";
                }
                mainCtx.stroke();

                var conlen = Vect2d.subtract(connector.fixator1.position, connector.fixator2.position).magnitude();

                if(conlen < 100){
                    mainCtx.stroke();
                    mainCtx.beginPath();
                    mainCtx.moveTo(connector.fixator1.position.x+GLOBAL_renderOffset.x, connector.fixator1.position.y+GLOBAL_renderOffset.y);
                    mainCtx.lineTo(connector.fixator2.position.x+GLOBAL_renderOffset.x, connector.fixator2.position.y+GLOBAL_renderOffset.y);
                    mainCtx.strokeStyle = "#000000";
                    mainCtx.stroke();
                }
            }
        }
    }
}

class Fixator{
    constructor(position){
        this.spawnPosition = new Vect2d(position.x, position.y);
        this.position = position;
        this.isFixated = false;
    }

    fixate(){
        this.isFixated = true;
    }

    loosen(){
        this.isFixated = false;
    }
}

class Connector{
    constructor(fixator1, fixator2){
        this.fixator1 = fixator1;
        this.fixator2 = fixator2;
        this.diameter = GLOBAL_fixatorRadius;
        this.extendedLength = Vect2d.subtract(fixator1.position, fixator2.position).magnitude();
    }

    contract(){
        let vect12 = Vect2d.subtract(this.fixator2.position, this.fixator1.position);
        let vect21 = Vect2d.subtract(this.fixator1.position, this.fixator2.position);
        let distance = vect12.magnitude();
        if(this.fixator1.isFixated && !this.fixator2.isFixated){
            this.fixator2.position.add(Vect2d.multiply(Vect2d.normalize(vect21), (distance-2*GLOBAL_fixatorRadius)));
        }else if(this.fixator2.isFixated && !this.fixator1.isFixated){
            this.fixator1.position.add(Vect2d.multiply(Vect2d.normalize(vect12), (distance-2*GLOBAL_fixatorRadius)));
        }else if(!this.fixator1.isFixated && !this.fixator2.isFixated){
            this.fixator2.position.add(Vect2d.multiply(Vect2d.normalize(vect21), (distance/2-GLOBAL_fixatorRadius)));
            this.fixator1.position.add(Vect2d.multiply(Vect2d.normalize(vect12), (distance/2-GLOBAL_fixatorRadius)));
        }
    }

    extend(){
        let vect12 = Vect2d.subtract(this.fixator2.position, this.fixator1.position);
        let vect21 = Vect2d.subtract(this.fixator1.position, this.fixator2.position);
        let deltaToExtendedLength = this.extendedLength - vect12.magnitude();
        if(deltaToExtendedLength > 0){
            if(this.fixator1.isFixated && !this.fixator2.isFixated){
                this.fixator2.position.add(Vect2d.multiply(Vect2d.normalize(vect12), (deltaToExtendedLength)));
            }else if(this.fixator2.isFixated && !this.fixator1.isFixated){
                this.fixator1.position.add(Vect2d.multiply(Vect2d.normalize(vect21), (deltaToExtendedLength)));
            }else if(!this.fixator1.isFixated && !this.fixator2.isFixated){
                this.fixator2.position.add(Vect2d.multiply(Vect2d.normalize(vect12), (deltaToExtendedLength/2)));
                this.fixator1.position.add(Vect2d.multiply(Vect2d.normalize(vect21), (deltaToExtendedLength/2)));
            }
        }
    }
}