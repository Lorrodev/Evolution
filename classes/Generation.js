class Generation{
    constructor(){
        this.number = 0;
        this.subjects = [];
        this.mostSubjectPoints = -1000;
        this.bestSubject = null;

        generations.push(this);
    }

    populate(numSubjects){
        for(let s = 0; s < numSubjects; s++){
            this.subjects.push(generateRandomSubject(s, new Vect2d(1000, 1000), 100));
        }
    }

    populateWithMutation(subject, numMutations){
        for(let m = 0; m < numMutations; m++){

            let mutation = mutateSubject(subject);

            if(mutation != null){
                this.subjects.push(mutation);
            }
        }

        //Add best subject from last generation
        this.subjects.push(cloneSubject(subject));
    }

    drawSubjects(){
        for(let s = 0; s < this.subjects.length; s++){
            let subject = this.subjects[s];
            subject.draw();
        }
    }

    update(){
        for(let s = 0; s < this.subjects.length; s++){
            let subject = this.subjects[s];
            subject.update();

            this.checkZones(subject);
        }
    }

    getBestSubject(){
        for(let s = 0; s < this.subjects.length; s++){
            let subject = this.subjects[s];
            
            if(subject.points > this.mostSubjectPoints){
                this.mostSubjectPoints = subject.points;
                this.bestSubject = subject;
            }
        }

        return this.bestSubject;
    }

    checkZones(subject){
        for(var z = 0; z < zones.length; z++){
            let zone = zones[z];
            
            for(let f = 0; f < subject.fixators.length; f++){
                let fixator = subject.fixators[f];
                if(zone.contains(fixator.position)){
                    subject.points += zone.points;
                    //console.log("Awarded subject #"+subject.id+" with "+zone.points+" points");
                }
            }
        }
    }
}