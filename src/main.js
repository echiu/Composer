
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
// time interval between keys, in milliseconds
var timeInterval = 500; 
// see image of electronic keyboard to understand indexing:
// https://images-na.ssl-images-amazon.com/images/I/81uw9BUrzTL._SL1500_.jpg
// A0, Bb0, B0, C1, Db1, D1, ... Bb7, B7, C8
var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var pianoLoadCount = 0;

var ionian =  [2, 2, 1, 2, 2, 2, 1];
var dorian =  [2, 1, 2, 2, 2, 1, 2];
var aeolian = [2, 1, 2, 2, 2, 1, 2];




// called after the scene loads
function onLoad(framework) 
{
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var controls = framework.controls;
  //var gui = framework.gui;
  //var stats = framework.stats;

  // load all the piano key mp3 files
  for (var i = 0; i < length; i++)
  {
    // why we have to use a try catch statement for loading, or else i = (length - 1) for all
    // https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
    try { throw i }
    catch (key) 
    {
      setTimeout(function()
      {
        // we are skipping A0, Bb0, B0, and C8
        audioLoader.load( './sounds/piano/' + notes[key % 12] + (Math.floor(key / 12) + 1) + '.mp3', function( buffer ) 
        {
          order[key] = new THREE.Audio(listener);
          order[key].name = notes[key % 12] + (Math.floor(key / 12) + 1);
          order[key].setBuffer( buffer );
          order[key].setVolume(1.0);
          pianoLoadCount++;
        });

      }, 1000);
    }

  }

}

// called on frame updates
function onUpdate(framework) 
{
  // play key every time interval
  if (Math.abs(Date.now() - startTime) >= timeInterval)
  {

    console.log("index: " + index);

    if (pianoLoadCount >= length && order[index] != undefined)
    {

        console.log(order[index].name);

      if (index + 7 < length)
      {
        if (order[index].isPlaying) { order[index].stop(); }
        order[index].play();
        //order[index + 4].play();
        //order[index + 7].play();
      }
      
      if (index < length)
      {
        index = index + 1 * direction;
      }
    }

    startTime = Date.now();
  }

}


// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
