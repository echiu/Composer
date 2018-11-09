export default class State 
{
	constructor(root, mode, degree, numKeys)
	{
		// modes
		// ionian is typical major scale, aeolian is typical minor scale
		// ionian[0] = 2 means it takes 2 half steps to get from 1st to 2nd note
		// ionian[2] = 1 means it takes 1 half steps to get from 3rd to 4th note
		var ionian =     [2, 2, 1, 2, 2, 2, 1];
		var dorian =     [2, 1, 2, 2, 2, 1, 2];
		var phrygian =   [1, 2, 2, 2, 1, 2, 2];
		var lydian =     [2, 2, 2, 1, 2, 2, 1];
		var mixolydian = [2, 2, 1, 2, 2, 1, 2];
		var aeolian =    [2, 1, 2, 2, 1, 2, 2];
		var locrian =    [1, 2, 2, 1, 2, 2, 2];
		this.modes = [ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian];

		// probabilities of chord progressions
		// progressions[0][0] means there is a 0.10 chance to get from I to I
		// progressions[4][0] means there is a 0.95 chance ot get from V to I
		// see diagrams here:
		// http://www.angelfire.com/music/HarpOn/image/chordprogmaj.gif
		// http://www.angelfire.com/music/HarpOn/image/chordprogmin.gif
		this.progressions = [
		  [0.00, 0.15, 0.15, 0.20, 0.20, 0.15, 0.15],
		  [0.00, 0.00, 0.00, 0.00, 0.70, 0.00, 0.30],
		  [0.00, 0.00, 0.00, 0.20, 0.00, 0.80, 0.00],
		  [0.20, 0.20, 0.00, 0.00, 0.50, 0.00, 0.10],
		  [0.60, 0.00, 0.00, 0.00, 0.00, 0.40, 0.00],
		  [0.00, 0.70, 0.00, 0.20, 0.10, 0.00, 0.00],
		  [0.70, 0.00, 0.00, 0.00, 0.30, 0.00, 0.00]];

	  	// check if all rows in progressions add up to 1.0
	  	for (var i = 0; i < this.progressions.length; i++) {
	    	var probabilitySum = 0.0;
	    	for (var j = 0; j < this.progressions[i].length; j++) {
	      		probabilitySum += this.progressions[i][j];
	    	}
	    	if (Math.abs(1.0 - probabilitySum) > 0.001) {
	      		console.log("ERROR: progression probability for row " + i + " does not add up to 1.0.");
	    	}
	  	}
    
		// starting note of the scale, index on the piano keyboard
		this.root = root;
		// mode, the type of scale: ionian, dorian, etc.
		this.mode = mode;
		// degree, location on the scale
		// I   II  III  IV  V   VI  VII
		// 0   1    2   3   4   5    6
		this.degree = degree;
		// number of keys on the piano keyboard
		this.numKeys = numKeys;
	}

	doProgression()
	{
		var progressionOptions = this.progressions[this.degree];
		var newDegree = this.degree;
		var seed = Math.random();
	  	var sumProbability = 0.0;
	  	// iterate through the probabilities to figure out new degree
	  	for (var i = 0; i < progressionOptions.length; i++) {
	    	sumProbability += progressionOptions[i];
	    	if (seed < sumProbability) { 
	    		newDegree = i; 
	    		break; 
	    	}
	  	}
	  	console.log("newDegree: " + (newDegree+1));
	  	
	  	// find new degree chord notes in piano keyboard indices 
	  	var currMode = this.modes[this.mode];
	  	var note1 = this.root;
	  	for (var i = 0; i < newDegree; i++) {
	  		note1 += currMode[i];
	  	}
	  	var note2 = note1;
	  	for (var i = newDegree; i < newDegree + 2; i++) {
	  		note2 += currMode[i % currMode.length];
	  	}
	  	var note3 = note2;
	  	for (var i = newDegree + 2; i < newDegree + 4; i++) {
	  		note3 += currMode[i % currMode.length];
	  	}

	  	// inversion

	  	// update
	  	this.degree = newDegree;

	  	// play one, two, or three notes of the chord
	  	// together or arpeggio
	  	var output = [[note1, note2, note3], [3]]
	  	return output;
	}

	doModulation()
	{

	}

}