
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import State from './state.js'

//sound
var listener = new THREE.AudioListener();
var audioLoader = new THREE.AudioLoader();

var instruments = new Array();
var instrumentNames = ['piano', 'french-horn', 'clarinet', 'cello'];

// index = 40 because instruments[X][40] is middle C
var index = 40; 
var length = 84;
var prevTime = Date.now();
var direction = 1;

// time interval between notes, in milliseconds
var baseTimeInterval = 2000; // time for a whole note
var currTimeInterval = baseTimeInterval;

var startTime = Date.now();
var periodTime = 900000.0; // 15 minutes
// 300000.0; // 5 minutes
// 60000.0; // 1 minute
// 1200000.0 // 20 minutes
//3600000.0; // one hour

// see image of electronic keyboard to understand indexing:
// https://images-na.ssl-images-amazon.com/images/I/81uw9BUrzTL._SL1500_.jpg
// A0, Bb0, B0, C1, Db1, D1, ... Bb7, B7, C8
var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var fileLoadCount = 0;

var state = new State(40, 0, 0, 84);
// keeps track of which notes to play next
var notesQueue = [];
// keeps track of number of notes to play at once next
var countQueue = [];

function lerp(value0, value1, t)
{
  return ((1.0 - t) * value0) + (t * value1);
}

// generates notes for one KEY, for a random number of measures
// then passes it on to another KEY
function generateMelody()
{
  var output;
  if (state.degree == 0 && Math.random() < 0.5) { output = state.doModulation(); } 
  else { output = state.doProgression(); }
  // transfer data to queues
  for (var i = 0; i < output[0].length; i++) { notesQueue.push(output[0][i]); }
  for (var i = 0; i < output[1].length; i++) { countQueue.push(output[1][i]); }
}

// called after the scene loads
function onLoad(framework) 
{
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var controls = framework.controls;
  //var gui = framework.gui;
  //var stats = framework.stats;


  for (var j = 0; j < instrumentNames.length; j++)
  {
    try { throw j }
    catch (instrument)
    {
      setTimeout(function()
      {
        instruments[instrument] = new Array();

        // load all the piano note mp3 files
        for (var i = 0; i < length; i++)
        {
          // we have to use a try catch statement for loading, or else i = (length - 1) for all
          // read more here:
          // https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
          try { throw i }
          catch (note) 
          {
            setTimeout(function()
            {

              // we are skipping A0, Bb0, B0, and C8, Db8
              audioLoader.load( './sounds/' + instrumentNames[instrument] + '/' + notes[note % 12] + (Math.floor(note / 12) + 1) + '.mp3', function( buffer ) 
              {
                instruments[instrument][note] = new THREE.Audio(listener);
                instruments[instrument][note].name = notes[note % 12] + (Math.floor(note / 12) + 1);
                instruments[instrument][note].setBuffer( buffer );
                // instruments[instrument][note].setVolume(1.0); DOESN'T WORK
                // switch(instrumentNames[instrument])
                // {
                //   case 'piano':
                //     instruments[instrument][note].setVolume(1.0);
                //   case 'clarinet':
                //     instruments[instrument][note].setVolume(0.0);
                //   case 'cello':
                //     instruments[instrument][note].setVolume(1.0);
                //   case 'french-horn':
                //     instruments[instrument][note].setVolume(1.2);
                //   default:
                //     instruments[instrument][note].setVolume(1.0);
                // }
                  
                fileLoadCount++;
              });

            }, 1000);
          }
        }

      }, 1000);
    }
  }

}

// called on frame updates
function onUpdate(framework) 
{
  // play notes next on notesQueue every time interval
  // double check all piano sounds loaded
  if (Math.abs(prevTime - Date.now()) >= currTimeInterval && fileLoadCount >= length * instrumentNames.length)
  {

    // for (var tit = startTime; tit < startTime + periodTime; tit = tit + periodTime/6)
    // {
      var lerpU = (Math.abs(Date.now() - startTime) % periodTime) / periodTime;
      // (center - 3.0 * variance) to (center + 3.0 * variance) covers 99.7% of the distribution
      var variance2 = (0.5 / 3.0) * (0.5 / 3.0);
      var x2 = (lerpU - 0.5) * (lerpU - 0.5);
      var gaussian = 1.0 * Math.pow(2.71828, -0.5 * x2 / variance2); // multiply by 1 because we want tallest part to be 1

      var uInstrument = Math.min(Math.ceil(instrumentNames.length * gaussian), instrumentNames.length);
      var uMinNotes = Math.min(Math.ceil(3 * gaussian), 3);
      var uMaxNotes = Math.min(Math.ceil(6 * gaussian), 6);
      var uProgression = gaussian;
      var uInversion = gaussian;

      // console.log("lerpU: " + lerpU);
      // console.log("uInstrument: " + uInstrument);
      // console.log("uMinNotes: " + uMinNotes);
      // console.log("uMaxNotes: " + uMaxNotes);
      // console.log("uInversion: " + uInversion);
      // console.log("uProgression: " + uProgression);
      // console.log(" ")
    // }

    state.minNotes = uMinNotes;
    state.maxNotes = uMaxNotes;
    state.uProgression = uProgression;
    state.uInversion = uInversion;



    // get the number of notes to play for this onUpdate step
    var count = countQueue.shift();

      for (var i = 0; i < count; i++)
      {
        var noteIndex = notesQueue.shift();
        // play same note on all instruments, must be inner loop
        for (var j = 0; j < uInstrument; j++)
        {
          // if the note is still playing, stop and play it again
          if (instruments[j][noteIndex].isPlaying) { instruments[j][noteIndex].stop(); }
          instruments[j][noteIndex].play();
        }
      }

    // if number of generated notes is less than the max notes played at once, generate more notes
    if (notesQueue.length < 6) { generateMelody(); }

    // update time interval
    prevTime = Date.now();
    var newTimeInterval = Math.pow(2.0, Math.round(Math.random() * -0.0)) * baseTimeInterval;
    var randomInterval = 0.125 * baseTimeInterval + (Math.random() * 0.875 * baseTimeInterval);
    currTimeInterval = lerp(randomInterval, newTimeInterval, gaussian);
    // console.log(" ");
    // console.log("currTimeInterval " + currTimeInterval);
    // console.log(" ");
  }

}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
