
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'

//sound
var listener = new THREE.AudioListener();
var audioLoader = new THREE.AudioLoader();

var order = new Array();
// index = 40, in other words, order[40] is middle C on piano
var index = 40; 
var length = 84;
var firstStep = true;
var startTime = Date.now();
var direction = 1;
// time interval between notes, in milliseconds
var timeInterval = 1000; 

// see image of electronic keyboard to understand indexing:
// https://images-na.ssl-images-amazon.com/images/I/81uw9BUrzTL._SL1500_.jpg
// A0, Bb0, B0, C1, Db1, D1, ... Bb7, B7, C8
var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var pianoLoadCount = 0;

// keeps track of which notes to play next
var notesQueue = [];
// keeps track of number of notes to play at once next
var countQueue = [];

// modes
// ionian is typical major scale, aeolian is typical minor scale
// ionian[0] = 2 means it takes 2 half steps to get from 1st to 2nd note
// ionian[2] = 1 means it takes 1 half steps to get from 3rd to 4th note
var ionian =     [2, 2, 1, 2, 2, 2, 1];
var dorian =     [2, 1, 2, 2, 2, 1, 2];
var phygian =    [1, 2, 2, 2, 1, 2, 2];
var lydian =     [2, 2, 2, 1, 2, 2, 1];
var mixolydian = [2, 2, 1, 2, 2, 1, 2];
var aeolian =    [2, 1, 2, 2, 1, 2, 2];
var locrian =    [1, 2, 2, 1, 2, 2, 2];
var modes = [ionian, dorian, phygian, lydian, mixolydian, aeolian, locrian];

// probabilities of chord progressions
// progressions[0][0] means there is a 0.10 chance to get from I to I
// progressions[4][0] means there is a 0.95 chance ot get from V to I
// see diagrams here:
// http://www.angelfire.com/music/HarpOn/image/chordprogmaj.gif
// http://www.angelfire.com/music/HarpOn/image/chordprogmin.gif
var progressions = [
  [0.10, 0.05, 0.05, 0.50, 0.20, 0.05, 0.05],
  [0.00, 0.00, 0.00, 0.00, 0.90, 0.00, 0.10],
  [0.00, 0.00, 0.00, 0.20, 0.00, 0.80, 0.00],
  [0.00, 0.05, 0.00, 0.00, 0.90, 0.00, 0.05],
  [0.95, 0.00, 0.00, 0.00, 0.00, 0.05, 0.00],
  [0.00, 0.75, 0.00, 0.20, 0.05, 0.00, 0.00],
  [0.70, 0.00, 0.00, 0.00, 0.30, 0.00, 0.00]];

var startNote = [];

function getNextProgression(oldNote)
{
  var seed = Math.random();
  var sumProbability = 0.0;
  // iterate through the probabilities of the oldNote row
  for (var i = 0; i < progressions[oldNote].length; i++) 
  {
    sumProbability += progressions[oldNote][i];
    if (seed <= sumProbability) { return i; }
  }
  return undefined;
}

// generates notes for one KEY, for a random number of measures
// then passes it on to another KEY
function generateMelody()
{
  // step one is to randomly choose the mode
  var random = Math.floor(Math.random() * modes.length);
  var currMode = modes[random];

  // step two is to play chords in mode
  random = Math.floor(Math.random() * 2);
  var isArpeggio = Math.floor(Math.random() * 2);
  if (random == 0 && index + currMode[0] + currMode[1] + currMode[2] + currMode[3] < length)
  {
    notesQueue.push(index);
    notesQueue.push(index + currMode[0] + currMode[1]);
    notesQueue.push(index + currMode[0] + currMode[1] + currMode[2] + currMode[3]);
    if (isArpeggio)
    {
      countQueue.push(1);
      countQueue.push(1);
      countQueue.push(1);
    }
    else
    {
      countQueue.push(3);
    }

    index = index + currMode[0] + currMode[1] + currMode[2] + currMode[3];
  }
  else if (random == 1 && index - currMode[3] - currMode[2] - currMode[1] - currMode[0] >= 0)
  {
    notesQueue.push(index);
    notesQueue.push(index - currMode[3] - currMode[2]);
    notesQueue.push(index - currMode[3] - currMode[2] - currMode[1] - currMode[0]);
    if (isArpeggio)
    {
      countQueue.push(1);
      countQueue.push(1);
      countQueue.push(1);
    }
    else
    {
      countQueue.push(3);
    }
    index = index - currMode[3] - currMode[2] - currMode[1] - currMode[0];
  }
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

  // check if all rows in progressions add up to 1.0
  for (var i = 0; i < progressions.length; i++)
  {
    var probabilitySum = 0.0;
    for (var j = 0; j < progressions[i].length; j++)
    {
      probabilitySum += progressions[i][j];
    }
    if (probabilitySum != 1.0)
    {
      console.log("ERROR: progression probability for row " + i + " does not add up to 1.0");
    }
  }

  // load all the piano note mp3 files
  for (var i = 0; i < length; i++)
  {
    // why we have to use a try catch statement for loading, or else i = (length - 1) for all
    // https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
    try { throw i }
    catch (note) 
    {
      setTimeout(function()
      {
        // we are skipping A0, Bb0, B0, and C8
        audioLoader.load( './sounds/piano/' + notes[note % 12] + (Math.floor(note / 12) + 1) + '.mp3', function( buffer ) 
        {
          order[note] = new THREE.Audio(listener);
          order[note].name = notes[note % 12] + (Math.floor(note / 12) + 1);
          order[note].setBuffer( buffer );
          order[note].setVolume(1.0);
          pianoLoadCount++;
        });

      }, 1000);
    }

  }

}

// called on frame updates
function onUpdate(framework) 
{
  // play notes next on notesQueue every time interval
  // double check all piano sounds loaded
  if (Math.abs(Date.now() - startTime) >= timeInterval && pianoLoadCount >= length)
  {
    // get the number of notes to play for this onUpdate step
    var count = countQueue.shift();

    for (var i = 0; i < count; i++)
    {
      var noteIndex = notesQueue.shift();
      // if the note is still playing, stop and play it again
      if (order[noteIndex].isPlaying) { order[noteIndex].stop(); }
      order[noteIndex].play();
    }

    if (notesQueue.length < 100)
    {
      generateMelody();
    }

    startTime = Date.now();
  }

}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
