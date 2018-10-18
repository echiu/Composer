
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'

//sound
var listener = new THREE.AudioListener();
var audioLoader = new THREE.AudioLoader();

var order = [];
// order[40] is middle C on piano
var index = 40; 
var length = 84;
var firstStep = true;
var startTime = Date.now();
var direction = 1;
// time interval between keys, in milliseconds
var timeInterval = 1000; 
var notes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];


var audioInitialized = new Promise((resolve, reject) => 
{ 
    for (var i = 0; i < length; i++)
    {
      order[i] = new THREE.Audio(listener);
    }

    setTimeout(function() {
      resolve();
    }, 5000);
}); 

/*
var audioLoaded = new Promise((resolve, reject) => 
{ 
    for (var i = 0; i < length; i++)
    {
      audioLoader.load( './sounds/piano/' + notes[i % 12] + (Math.floor(i / 12) + 1) + '.mp3', function( buffer ) {
        order[i].setBuffer( buffer );
        order[i].setVolume(1.0);
        resolve(order[i]);
      });
    }
}); 
*/

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  //var gui = framework.gui;
  //var stats = framework.stats;
  var controls = framework.controls;

  /*
  for (var i = 0; i < length; i++)
  {
    order[i] = new THREE.Audio(listener);
  }

  for (var i = 0; i < length; i++)
  {
    audioLoader.load( './sounds/piano/' + notes[i % 12] + i + '.mp3', function( buffer ) {
      order[i].setBuffer( buffer );
      order[i].setVolume(1.0);
    });
  }
  */

  Promise.all([audioInitialized]).then(values => 
  {  
      for (var i = 0; i < length; i++)
      {
        audioLoader.load( './sounds/piano/' + notes[i % 12] + (Math.floor(i / 12) + 1) + '.mp3', function( buffer ) {
          order[i].setBuffer( buffer );
          order[i].setVolume(1.0);
        });
      }
  });

}


// called on frame updates
function onUpdate(framework) 
{

  if (Math.abs(Date.now() - startTime) >= timeInterval)
  {
    order[index].play();

    startTime = Date.now();
    if (index < length)
    {
      index = index + 1;
    }

  }

}


// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
