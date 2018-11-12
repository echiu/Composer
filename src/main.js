
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import State from './state.js'

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

var state = new State(40, 0, 0, 84);
// keeps track of which notes to play next
var notesQueue = [];
// keeps track of number of notes to play at once next
var countQueue = [];

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

    if (notesQueue.length < 100) { generateMelody(); }

    startTime = Date.now();
  }

}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
