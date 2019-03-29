
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
            [0.00, 0.45, 0.00, 0.30, 0.25, 0.00, 0.00],
            [0.70, 0.00, 0.00, 0.00, 0.30, 0.00, 0.00]];

        // check if all rows in progressions add up to 1.0
        for (var i = 0; i < this.progressions.length; i++) {
            var sumProbability = 0.0;
            for (var j = 0; j < this.progressions[i].length; j++) {
                sumProbability += this.progressions[i][j];
            }
            if (Math.abs(1.0 - sumProbability) > 0.001) {
                console.log("ERROR: progression probability for row " + i 
                    + " does not add up to 1.0.");
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

        // number of notes played at once
        this.minNotes = 2;
        this.maxNotes = 6;
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
        console.log("newDegree (in roman): " + (newDegree + 1));
        
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
        var inversion = this.doInversion(note1, note2, note3, this.root);

        // update
        this.degree = newDegree;

        // play one, two, or three notes of the chord
        // together or arpeggio
        // var output = [[note1, note2, note3], [3]]
        var output = [inversion, this.doArpeggio(inversion.length)];
        return output;
    }


    doModulation()
    {
        // generates a number from 1 to 11
        // takes 12 half steps to jump one octave, this ensures a new key
        var offset = Math.ceil(11.0 * Math.random());
        var seed = Math.random();
        var leftProbability = this.root / this.numKeys;
        var sign;
        if (seed <= leftProbability) { sign = -1; } else { sign = 1; }
        
        var newRoot = this.root + sign * offset;
        //if (this.root + offset >= this.numKeys) { newRoot = this.root - offset; }
        //else if (this.root - offset < 0) { newRoot = this.root + offset; }
        //else { newRoot = this.root + sign * offset; }
        var newMode = Math.floor(Math.random() * this.modes.length);

        console.log(" ");
        console.log("doing modulation");
        console.log("oldRoot: " + this.root);
        console.log("oldMode: " + this.mode);
        console.log("sign " + sign);
        console.log("newRoot: " + newRoot);
        console.log("newMode: " + newMode);

        // compare all chords between two roots/modes 
        // find chords with no difference (diatonic) or half step difference (altered)
        // https://www.artofcomposing.com/the-art-of-modulation-part-2-common-chord-modulation
        var diatonic = [];
        var oldAltered = [];
        var newAltered = [];
        var oldStartNote = this.root;
        // iterate through the old mode
        for (var i = 0; i < this.modes[this.mode].length; i++)
        {
            var oldNote1 = oldStartNote;
            var oldNote2 = oldStartNote + this.modes[this.mode][i] + this.modes[this.mode][i + 1];
            var oldNote3 = oldNote2 + this.modes[this.mode][i + 2] + this.modes[this.mode][i + 3];

            // iterate through the new mode
            var newStartNote = newRoot;
            for (var j = 0; j < this.modes[newMode].length; j++)
            {
                var newNote1 = newStartNote;
                var newNote2 = newStartNote + this.modes[newMode][j] + this.modes[newMode][j + 1];
                var newNote3 = newNote2 + this.modes[newMode][j + 2] + this.modes[newMode][j + 3];
                
                // modding by 12 removes octaves
                var diffNote1 = Math.abs((newNote1 % 12) - (oldNote1 % 12));
                var diffNote2 = Math.abs((newNote2 % 12) - (oldNote2 % 12));
                var diffNote3 = Math.abs((newNote3 % 12) - (oldNote3 % 12));

                // chords that have no difference are added to diatonic list
                if (diffNote1 + diffNote2 + diffNote3 == 0)
                {
                    diatonic.push([newNote1, newNote2, newNote3, j]);
                }
                // chords that have half step difference, but base note must be same
                // are added to altered list
                else if (diffNote1 == 0 && diffNote2 + diffNote3 == 1.0)
                {
                    oldAltered.push([oldNote1, oldNote2, oldNote3, j]);
                    newAltered.push([newNote1, newNote2, newNote3, j]);
                }

                // shift the start note to next one in old mode
                newStartNote += this.modes[newMode][j];
            }

            // shift the start note to the next one in new mode
            oldStartNote += this.modes[this.mode][i];
        }

        if (diatonic.length == 0 && oldAltered.length == 0 && newAltered.length == 0)
        {
            console.log(" ");
            console.log("no common chord found, switching to progression");
            console.log(" ");
            return this.doProgression();
        }

        // play old altered first
        // play diatonic in the middle
        // play new altered last
        var commonChords = [oldAltered, diatonic, newAltered];
        var outputNotes = [];
        var outputCount = [];
        for (var h = 0; h < commonChords.length; h++)
        {
            for (var i = 0; i < commonChords[h].length; i++)
            {
                console.log("common chords " + commonChords[h][i][0] + " " + commonChords[h][i][1] + " " + commonChords[h][i][2]);

                // play notes as inversion
                var inversion = this.doInversion(commonChords[h][i][0], 
                                                 commonChords[h][i][1], 
                                                 commonChords[h][i][2], 
                                                 this.root);
                for (var j = 0; j < inversion.length; j++) { outputNotes.push(inversion[j]); }
                // play notes in arpeggio
                var arpeggio = this.doArpeggio(inversion.length);
                for (var j = 0; j < arpeggio.length; j++) { outputCount.push(arpeggio[j]); }
                // update degree for future progressions
                this.degree = commonChords[h][i][3];
            }
        }

        console.log(" ");

        // update
        this.root = newRoot;
        this.mode = newMode;

        var output = [outputNotes, outputCount];
        return output;
    }


    normalizeDistribution(list)
    {
        var normalizedList = list.slice(0);
        var magnitude = 0.0;
        for (var i = 0; i < list.length; i++) { magnitude += list[i]; }
        for (var i = 0; i < normalizedList.length; i++) { normalizedList[i] /= magnitude; }
        return normalizedList;
    }


    doInversion(note1, note2, note3, hand)
    {
        var baseNote1 = note1 % 12;
        var baseNote2 = note2 % 12;
        var baseNote3 = note3 % 12;
        var possibleNotes = [];
        var probabilities = [];

        // get list of all chord notes on the keyboard
        while (baseNote1 < this.numKeys && 
               baseNote2 < this.numKeys && 
               baseNote3 < this.numKeys)
        {
            possibleNotes.push(baseNote1);
            possibleNotes.push(baseNote2);
            possibleNotes.push(baseNote3);
            baseNote1 += 12;
            baseNote2 += 12;
            baseNote3 += 12;
        }

        // sort possible notes in numeric order
        possibleNotes.sort(function(a,b){return a - b});

        // calculates the gaussian distribution weighting
        // one distribution has center of list as highest weight
        // another distribution has hand location as highest weight
        // this skews to play notes near the center and hand
        // https://en.wikipedia.org/wiki/Gaussian_function
        // solve for variance
        // https://en.wikipedia.org/wiki/Normal_distribution#/media/File:Empirical_Rule.PNG
        for (var i = 0 ; i < possibleNotes.length; i++)
        {
            // gaussian for notes near hand
            var amplitude = 1.0;
            // (center - 3.0 * variance) to (center + 3.0 * variance) covers 99.7% of the distribution
            // 12 half steps in one octave, can move within one octave in both directions
            var variance2 = (12.0 / 3.0) * (12.0 / 3.0);
            var x2 = (possibleNotes[i] - hand) * (possibleNotes[i] - hand);
            var noteProbability = amplitude * Math.pow(2.71828, -0.5 * x2 / variance2);
            probabilities[i] = noteProbability;

            // gaussian for notes near center of list
            amplitude = 0.5;
            // (center - 3.0 * variance) to (center + 3.0 * variance) covers 99.7% of the distribution
            // subtracting 24 removes octave 1 and 7 from possibility, only piano has sounds, not good alone
            variance2 = (((possibleNotes.length - 24) / 2.0) / 3.0) * (((possibleNotes.length - 24) / 2.0) / 3.0);
            x2 = (i - (possibleNotes.length / 2.0)) * (i - (possibleNotes.length / 2.0));
            noteProbability = amplitude * Math.pow(2.71828, -0.5 * x2 / variance2)
            probabilities[i] += noteProbability;
        }

        // console.log("probabilities " + this.normalizeDistribution(probabilities));
        
        var output = [];
        var numNotes = Math.round((this.maxNotes - this.minNotes) * Math.random() + this.minNotes);
        var countNotes = 0;
        while (countNotes < numNotes)
        {   
            probabilities = this.normalizeDistribution(probabilities);
            var seed = Math.random();
            var sumProbability = 0.0;
            // iterate through the probabilities to figure out new degree
            for (var i = 0; i < probabilities.length; i++) {
                sumProbability += probabilities[i];
                if (seed < sumProbability) { 
                    output.push(possibleNotes[i]);
                    probabilities[i] = 0.0; 
                    break; 
                }
            }
            countNotes++;
        }

        output.sort(function(){return Math.random() - 0.5});
        console.log("inversion " + output);
        return output;
    }


    doArpeggio(numNotes)
    {
        var outputCount = [];
        var countNotes = 0;
        while (countNotes < numNotes) {
            var seed = Math.ceil((numNotes - countNotes) * Math.random());
            outputCount.push(seed);
            countNotes += seed;
        }
        return outputCount;
    }

}


