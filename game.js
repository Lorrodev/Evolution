//+++Variable Declaration
var mainCanvas;
var mainCtx;

var fps = 1;
var ups = 200;

var frameInterval = 1000/fps;
var timeLastFrame = -1;
var frameDeltaTime = -1;

var updateInterval = 1000/ups;
var timeLastUpdate = -1;
var updateDeltaTime = -1;

var debugLevel = 3; //0: none - 3: deep

//---Variable Declaration
var GLOBAL_fixatorRadius = 10;
var GLOBAL_currentGeneration = 0;
var GLOBAL_stepsThisGen = 0;
var GLOBAL_renderOffset = new Vect2d(1000, 1000);

var generations = [];
var zones = [];
//var subjects = [];

var draw = false;

window.onload = setup;

function setup(){
    mainCanvas = document.getElementById("mainCanvas");
    mainCtx = mainCanvas.getContext("2d");
    
    //Start update/animation cycle
    timeLastFrame = Date.now();
    timeLastUpdate = Date.now();

    //+++TEST
    new Generation();
	generations[0].populate(200);

    //Rewards
    new Zone("Reward", 2, new Vect2d(-200, -600), new Vect2d(400, 100), "#9bff73");
    new Zone("Reward", 1, new Vect2d(-600, -300), new Vect2d(200, 400), "#9bff73");
    new Zone("Reward", 1, new Vect2d(400, -300), new Vect2d(200, 400), "#9bff73");

    //Penalty
    new Zone("Penalty", -1, new Vect2d(-100, -100), new Vect2d(200, 200), "#ff7f73");
    new Zone("Penalty", -3, new Vect2d(-400, -400), new Vect2d(800, 100), "#ff7f73");
    //---TEST

    updateGame();
}

function updateGame(){
    //Game Updates
    updateDeltaTime = Date.now() - timeLastUpdate;

    if(updateDeltaTime > updateInterval){
        timeLastUpdate = Date.now();

        //game updates go here
        generations[GLOBAL_currentGeneration].update();
        GLOBAL_stepsThisGen++;

        if(GLOBAL_stepsThisGen > 500){
            GLOBAL_stepsThisGen = 0;
            nextGeneration();
        }
    }


    //Frame Rendering
    frameDeltaTime = Date.now() - timeLastFrame;

    if(frameDeltaTime > frameInterval){
        timeLastFrame = Date.now();

        nextFrame();
    }

    setTimeout(updateGame, 1);
}

function nextFrame(){
    mainCtx.clearRect(0, 0, 2000, 2000);

    //frame updates go here
    for(z = 0; z < zones.length; z++){
        zones[z].draw();
    }
    
    generations[GLOBAL_currentGeneration].drawSubjects();
}