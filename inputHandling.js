window.addEventListener("keydown", keyDownRecieved, false);
window.addEventListener("keyup", keyUpRecieved, false);

//Keymap defaults
var boostKey = 87; //W
var reverseBoostKey = 83; //S
var turnLeftKey = 65; //Q
var turnRightKey = 68; //E
var strafeLeftKey = 81; //A
var strafeRightKey = 69; //D
var spaceBreakKey = 32; //Space

//Input values
var boost = false;
var reverseBoost = false;
var turnLeft = false;
var turnRight = false;
var strafeLeft = false;
var strafeRight = false;
var spaceBreak = false;


function keyDownRecieved(e) {
	switch(e.keyCode){
		case boostKey:
			boost = true;
        break;

		case reverseBoostKey:
			reverseBoost = true;
		break;

		case turnLeftKey:
			turnLeft = true;
        break;

		case turnRightKey:
			turnRight = true;
        break;
        
		case strafeLeftKey:
			strafeLeft = true;
		break;
		
		case strafeRightKey:
			strafeRight = true;
		break;
		
		case spaceBreakKey:
			spaceBreak = true;
		break;
	}
}

function keyUpRecieved(e) {
	switch(e.keyCode){
		case boostKey:
			boost = false;
        break;

		case reverseBoostKey:
			reverseBoost = false;
		break;

		case turnLeftKey:
			turnLeft = false;
        break;

		case turnRightKey:
			turnRight = false;
        break;
        
		case strafeLeftKey:
			strafeLeft = false;
		break;
		
		case strafeRightKey:
			strafeRight = false;
        break;
		
		case spaceBreakKey:
			spaceBreak = false;
		break;
	}
}