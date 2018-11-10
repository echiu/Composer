
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'

//sound
var listener = new THREE.AudioListener();
var audioLoader = new THREE.AudioLoader();
var playerPromise;

var order = [];
var index = 40;
var length = 84;
var firstStep = true;
var startTime = Date.now();
var direction = 1;
var timeInterval = 1000;

/*
var A = [];
var Ab = [];
var B = [];
var Bb = [];
var C = [];
var D = [];
var Db = [];
var E = [];
var Eb = [];
var F = [];
var G = [];
var Gb = [];

function initSounds()
{
  for (var i = 1; i < 8; i++)
  {
    A[i] = new THREE.Audio(listener);
    Ab[i] = new THREE.Audio(listener);
    B[i] = new THREE.Audio(listener);
    Bb[i] = new THREE.Audio(listener);
    C[i] = new THREE.Audio(listener);
    D[i] = new THREE.Audio(listener);
    Db[i] = new THREE.Audio(listener);
    E[i] = new THREE.Audio(listener);
    Eb[i] = new THREE.Audio(listener);
    F[i] = new THREE.Audio(listener);
    G[i] = new THREE.Audio(listener);
    Gb[i] = new THREE.Audio(listener);
  }
}

function loadSounds()
{
  for (var i = 1; i < 8; i++)
  {

    audioLoader.load( './sounds/piano/A' + i + '.mp3', function( buffer ) {
      A[i].setBuffer( buffer );
      A[i].setVolume(1.0);
    });
    
    audioLoader.load( './sounds/piano/Ab' + i + '.mp3', function( buffer ) {
      Ab[i].setBuffer( buffer );
      Ab[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/B' + i + '.mp3', function( buffer ) {
      B[i].setBuffer( buffer );
      B[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/Bb' + i + '.mp3', function( buffer ) {
      Bb[i].setBuffer( buffer );
      Bb[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/C' + i + '.mp3', function( buffer ) {
      C[i].setBuffer( buffer );
      C[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/D' + i + '.mp3', function( buffer ) {
      D[i].setBuffer( buffer );
      D[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/Db' + i + '.mp3', function( buffer ) {
      Db[i].setBuffer( buffer );
      Db[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/E' + i + '.mp3', function( buffer ) {
      E[i].setBuffer( buffer );
      E[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/Eb' + i + '.mp3', function( buffer ) {
      Eb[i].setBuffer( buffer );
      Eb[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/F' + i + '.mp3', function( buffer ) {
      F[i].setBuffer( buffer );
      F[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/G' + i + '.mp3', function( buffer ) {
      G[i].setBuffer( buffer );
      G[i].setVolume(1.0);
    });
    audioLoader.load( './sounds/piano/Gb' + i + '.mp3', function( buffer ) {
      Gb[i].setBuffer( buffer );
      Gb[i].setVolume(1.0);
    });
    
  }
}
*/

var A0 = new THREE.Audio(listener);
var A1 = new THREE.Audio(listener);
var A2 = new THREE.Audio(listener);
var A3 = new THREE.Audio(listener);
var A4 = new THREE.Audio(listener);
var A5 = new THREE.Audio(listener);
var A6 = new THREE.Audio(listener);
var A7 = new THREE.Audio(listener);

var Ab1 = new THREE.Audio(listener);
var Ab2 = new THREE.Audio(listener);
var Ab3 = new THREE.Audio(listener);
var Ab4 = new THREE.Audio(listener);
var Ab5 = new THREE.Audio(listener);
var Ab6 = new THREE.Audio(listener);
var Ab7 = new THREE.Audio(listener);

var B0 = new THREE.Audio(listener);
var B1 = new THREE.Audio(listener);
var B2 = new THREE.Audio(listener);
var B3 = new THREE.Audio(listener);
var B4 = new THREE.Audio(listener);
var B5 = new THREE.Audio(listener);
var B6 = new THREE.Audio(listener);
var B7 = new THREE.Audio(listener);

var Bb0 = new THREE.Audio(listener);
var Bb1 = new THREE.Audio(listener);
var Bb2 = new THREE.Audio(listener);
var Bb3 = new THREE.Audio(listener);
var Bb4 = new THREE.Audio(listener);
var Bb5 = new THREE.Audio(listener);
var Bb6 = new THREE.Audio(listener);
var Bb7 = new THREE.Audio(listener);

var C1 = new THREE.Audio(listener);
var C2 = new THREE.Audio(listener);
var C3 = new THREE.Audio(listener);
var C4 = new THREE.Audio(listener);
var C5 = new THREE.Audio(listener);
var C6 = new THREE.Audio(listener);
var C7 = new THREE.Audio(listener);
var C8 = new THREE.Audio(listener);

var D1 = new THREE.Audio(listener);
var D2 = new THREE.Audio(listener);
var D3 = new THREE.Audio(listener);
var D4 = new THREE.Audio(listener);
var D5 = new THREE.Audio(listener);
var D6 = new THREE.Audio(listener);
var D7 = new THREE.Audio(listener);

var Db1 = new THREE.Audio(listener);
var Db2 = new THREE.Audio(listener);
var Db3 = new THREE.Audio(listener);
var Db4 = new THREE.Audio(listener);
var Db5 = new THREE.Audio(listener);
var Db6 = new THREE.Audio(listener);
var Db7 = new THREE.Audio(listener);
var Db8 = new THREE.Audio(listener);

var E1 = new THREE.Audio(listener);
var E2 = new THREE.Audio(listener);
var E3 = new THREE.Audio(listener);
var E4 = new THREE.Audio(listener);
var E5 = new THREE.Audio(listener);
var E6 = new THREE.Audio(listener);
var E7 = new THREE.Audio(listener);

var Eb1 = new THREE.Audio(listener);
var Eb2 = new THREE.Audio(listener);
var Eb3 = new THREE.Audio(listener);
var Eb4 = new THREE.Audio(listener);
var Eb5 = new THREE.Audio(listener);
var Eb6 = new THREE.Audio(listener);
var Eb7 = new THREE.Audio(listener);

var F1 = new THREE.Audio(listener);
var F2 = new THREE.Audio(listener);
var F3 = new THREE.Audio(listener);
var F4 = new THREE.Audio(listener);
var F5 = new THREE.Audio(listener);
var F6 = new THREE.Audio(listener);
var F7 = new THREE.Audio(listener);

var G1 = new THREE.Audio(listener);
var G2 = new THREE.Audio(listener);
var G3 = new THREE.Audio(listener);
var G4 = new THREE.Audio(listener);
var G5 = new THREE.Audio(listener);
var G6 = new THREE.Audio(listener);
var G7 = new THREE.Audio(listener);

var Gb1 = new THREE.Audio(listener);
var Gb2 = new THREE.Audio(listener);
var Gb3 = new THREE.Audio(listener);
var Gb4 = new THREE.Audio(listener);
var Gb5 = new THREE.Audio(listener);
var Gb6 = new THREE.Audio(listener);
var Gb7 = new THREE.Audio(listener);

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  //var gui = framework.gui;
  //var stats = framework.stats;
  var controls = framework.controls;

  /*
  A[0] = new THREE.Audio(listener);
  audioLoader.load( './sounds/piano/A' + 0 + '.mp3', function( buffer ) {
    A[0].setBuffer( buffer );
    A[0].setVolume(1.0);
  });
  A[0].play();
  */

  /*
  // PLAYER
  playerPromise = new Promise((resolve, reject) => { 
      initSounds();

      if (A[1] != 'undefined' &&
          A[2] != 'undefined' && 
          A[3] != 'undefined' &&
          A[4] != 'undefined' &&
          A[5] != 'undefined' &&
          A[6] != 'undefined' &&
          A[7] != 'undefined') 
      {
          console.log("resolving");
          resolve();
      }
  }); 

  Promise.all([playerPromise]).then(values => {
    loadSounds();
    A[1].play();
  });
  */


  /*
  console.log(A);
  console.log(A[0]);
  audioLoader.load( './sounds/piano/A' + 0 + '.mp3', function( buffer ) {
      A[0].setBuffer( buffer );
      A[0].setVolume(1.0);
    });
  console.log(A[0]);
  A[0].play();

  for (var i = 0; i < 8; i++)
  {
    audioLoader.load( './sounds/piano/A' + i + '.mp3', function( buffer ) {
      A[i].setBuffer( buffer );
      A[i].setVolume(1.0);
    });
  }
  */
  

  audioLoader.load( './sounds/piano/A1.mp3', function( buffer ) {
    A1.setBuffer( buffer );
    A1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/A2.mp3', function( buffer ) {
    A2.setBuffer( buffer );
    A2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/A3.mp3', function( buffer ) {
    A3.setBuffer( buffer );
    A3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/A4.mp3', function( buffer ) {
    A4.setBuffer( buffer );
    A4.setVolume(1.0);
  });
  
  audioLoader.load( './sounds/piano/A5.mp3', function( buffer ) {
    A5.setBuffer( buffer );
    A5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/A6.mp3', function( buffer ) {
    A6.setBuffer( buffer );
    A6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/A7.mp3', function( buffer ) {
    A7.setBuffer( buffer );
    A7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/Ab1.mp3', function( buffer ) {
    Ab1.setBuffer( buffer );
    Ab1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab2.mp3', function( buffer ) {
    Ab2.setBuffer( buffer );
    Ab2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab3.mp3', function( buffer ) {
    Ab3.setBuffer( buffer );
    Ab3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab4.mp3', function( buffer ) {
    Ab4.setBuffer( buffer );
    Ab4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab5.mp3', function( buffer ) {
    Ab5.setBuffer( buffer );
    Ab5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab6.mp3', function( buffer ) {
    Ab6.setBuffer( buffer );
    Ab6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Ab7.mp3', function( buffer ) {
    Ab7.setBuffer( buffer );
    Ab7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/B1.mp3', function( buffer ) {
    B1.setBuffer( buffer );
    B1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/B2.mp3', function( buffer ) {
    B2.setBuffer( buffer );
    B2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/B3.mp3', function( buffer ) {
    B3.setBuffer( buffer );
    B3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/B4.mp3', function( buffer ) {
    B4.setBuffer( buffer );
    B4.setVolume(1.0);
  });
  
  audioLoader.load( './sounds/piano/B5.mp3', function( buffer ) {
    B5.setBuffer( buffer );
    B5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/B6.mp3', function( buffer ) {
    B6.setBuffer( buffer );
    B6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/B7.mp3', function( buffer ) {
    B7.setBuffer( buffer );
    B7.setVolume(1.0);
  });


    audioLoader.load( './sounds/piano/Bb1.mp3', function( buffer ) {
    Bb1.setBuffer( buffer );
    Bb1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Bb2.mp3', function( buffer ) {
    Bb2.setBuffer( buffer );
    Bb2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Bb3.mp3', function( buffer ) {
    Bb3.setBuffer( buffer );
    Bb3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Bb4.mp3', function( buffer ) {
    Bb4.setBuffer( buffer );
    Bb4.setVolume(1.0);
  });
  
  audioLoader.load( './sounds/piano/Bb5.mp3', function( buffer ) {
    Bb5.setBuffer( buffer );
    Bb5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Bb6.mp3', function( buffer ) {
    Bb6.setBuffer( buffer );
    Bb6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Bb7.mp3', function( buffer ) {
    Bb7.setBuffer( buffer );
    Bb7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/C1.mp3', function( buffer ) {
    C1.setBuffer( buffer );
    C1.setVolume(1.0);
  });
  
  audioLoader.load( './sounds/piano/C2.mp3', function( buffer ) {
    C2.setBuffer( buffer );
    C2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/C3.mp3', function( buffer ) {
    C3.setBuffer( buffer );
    C3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/C4.mp3', function( buffer ) {
    C4.setBuffer( buffer );
    C4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/C5.mp3', function( buffer ) {
    C5.setBuffer( buffer );
    C5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/C6.mp3', function( buffer ) {
    C6.setBuffer( buffer );
    C6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/C7.mp3', function( buffer ) {
    C7.setBuffer( buffer );
    C7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/D1.mp3', function( buffer ) {
    D1.setBuffer( buffer );
    D1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D2.mp3', function( buffer ) {
    D2.setBuffer( buffer );
    D2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D3.mp3', function( buffer ) {
    D3.setBuffer( buffer );
    D3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D4.mp3', function( buffer ) {
    D4.setBuffer( buffer );
    D4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D5.mp3', function( buffer ) {
    D5.setBuffer( buffer );
    D5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D6.mp3', function( buffer ) {
    D6.setBuffer( buffer );
    D6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/D7.mp3', function( buffer ) {
    D7.setBuffer( buffer );
    D7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/Db1.mp3', function( buffer ) {
    Db1.setBuffer( buffer );
    Db1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db2.mp3', function( buffer ) {
    Db2.setBuffer( buffer );
    Db2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db3.mp3', function( buffer ) {
    Db3.setBuffer( buffer );
    Db3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db4.mp3', function( buffer ) {
    Db4.setBuffer( buffer );
    Db4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db5.mp3', function( buffer ) {
    Db5.setBuffer( buffer );
    Db5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db6.mp3', function( buffer ) {
    Db6.setBuffer( buffer );
    Db6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Db7.mp3', function( buffer ) {
    Db7.setBuffer( buffer );
    Db7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/E1.mp3', function( buffer ) {
    E1.setBuffer( buffer );
    E1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E2.mp3', function( buffer ) {
    E2.setBuffer( buffer );
    E2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E3.mp3', function( buffer ) {
    E3.setBuffer( buffer );
    E3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E4.mp3', function( buffer ) {
    E4.setBuffer( buffer );
    E4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E5.mp3', function( buffer ) {
    E5.setBuffer( buffer );
    E5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E6.mp3', function( buffer ) {
    E6.setBuffer( buffer );
    E6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/E7.mp3', function( buffer ) {
    E7.setBuffer( buffer );
    E7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/Eb1.mp3', function( buffer ) {
    Eb1.setBuffer( buffer );
    Eb1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb2.mp3', function( buffer ) {
    Eb2.setBuffer( buffer );
    Eb2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb3.mp3', function( buffer ) {
    Eb3.setBuffer( buffer );
    Eb3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb4.mp3', function( buffer ) {
    Eb4.setBuffer( buffer );
    Eb4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb5.mp3', function( buffer ) {
    Eb5.setBuffer( buffer );
    Eb5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb6.mp3', function( buffer ) {
    Eb6.setBuffer( buffer );
    Eb6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Eb7.mp3', function( buffer ) {
    Eb7.setBuffer( buffer );
    Eb7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/F1.mp3', function( buffer ) {
    F1.setBuffer( buffer );
    F1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F2.mp3', function( buffer ) {
    F2.setBuffer( buffer );
    F2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F3.mp3', function( buffer ) {
    F3.setBuffer( buffer );
    F3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F4.mp3', function( buffer ) {
    F4.setBuffer( buffer );
    F4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F5.mp3', function( buffer ) {
    F5.setBuffer( buffer );
    F5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F6.mp3', function( buffer ) {
    F6.setBuffer( buffer );
    F6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/F7.mp3', function( buffer ) {
    F7.setBuffer( buffer );
    F7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/G1.mp3', function( buffer ) {
    G1.setBuffer( buffer );
    G1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G2.mp3', function( buffer ) {
    G2.setBuffer( buffer );
    G2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G3.mp3', function( buffer ) {
    G3.setBuffer( buffer );
    G3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G4.mp3', function( buffer ) {
    G4.setBuffer( buffer );
    G4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G5.mp3', function( buffer ) {
    G5.setBuffer( buffer );
    G5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G6.mp3', function( buffer ) {
    G6.setBuffer( buffer );
    G6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/G7.mp3', function( buffer ) {
    G7.setBuffer( buffer );
    G7.setVolume(1.0);
  });


  audioLoader.load( './sounds/piano/Gb1.mp3', function( buffer ) {
    Gb1.setBuffer( buffer );
    Gb1.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb2.mp3', function( buffer ) {
    Gb2.setBuffer( buffer );
    Gb2.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb3.mp3', function( buffer ) {
    Gb3.setBuffer( buffer );
    Gb3.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb4.mp3', function( buffer ) {
    Gb4.setBuffer( buffer );
    Gb4.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb5.mp3', function( buffer ) {
    Gb5.setBuffer( buffer );
    Gb5.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb6.mp3', function( buffer ) {
    Gb6.setBuffer( buffer );
    Gb6.setVolume(1.0);
  });

  audioLoader.load( './sounds/piano/Gb7.mp3', function( buffer ) {
    Gb7.setBuffer( buffer );
    Gb7.setVolume(1.0);
  });


  order[0] = Ab1;
  order[1] = A1;
  order[2] = Bb1;
  order[3] = B1;
  order[4] = C1;
  order[5] = Db1;
  order[6] = D1;
  order[7] = Eb1;
  order[8] = E1;
  order[9] = F1;
  order[10] = Gb1;
  order[11] = G1;

  order[12] = Ab2;
  order[13] = A2;
  order[14] = Bb2;
  order[15] = B2;
  order[16] = C2;
  order[17] = Db2;
  order[18] = D2;
  order[19] = Eb2;
  order[20] = E2;
  order[21] = F2;
  order[22] = Gb2;
  order[23] = G2;

  order[24] = Ab3;
  order[25] = A3;
  order[26] = Bb3;
  order[27] = B3;
  order[28] = C3;
  order[29] = Db3;
  order[30] = D3;
  order[31] = Eb3;
  order[32] = E3;
  order[33] = F3;
  order[34] = Gb3;
  order[35] = G3;

  order[36] = Ab4;
  order[37] = A4;
  order[38] = Bb4;
  order[39] = B4;
  order[40] = C4;
  order[41] = Db4;
  order[42] = D4;
  order[43] = Eb4;
  order[44] = E4;
  order[45] = F4;
  order[46] = Gb4;
  order[47] = G4;

  order[48] = Ab5;
  order[49] = A5;
  order[50] = Bb5;
  order[51] = B5;
  order[52] = C5;
  order[53] = Db5;
  order[54] = D5;
  order[55] = Eb5;
  order[56] = E5;
  order[57] = F5;
  order[58] = Gb5;
  order[59] = G5;

  order[60] = Ab6;
  order[61] = A6;
  order[62] = Bb6;
  order[63] = B6;
  order[64] = C6;
  order[65] = Db6;
  order[66] = D6;
  order[67] = Eb6;
  order[68] = E6;
  order[69] = F6;
  order[70] = Gb6;
  order[71] = G6;

  order[72] = Ab7;
  order[73] = A7;
  order[74] = Bb7;
  order[75] = B7;
  order[76] = C7;
  order[77] = Db7;
  order[78] = D7;
  order[79] = Eb7;
  order[80] = E7;
  order[81] = F7;
  order[82] = Gb7;
  order[83] = G7;

  /*
  A[0].play();
  A[1].play();
  A[2].play();
  */

}

function incrementIndex(stepSize)
{
  if (index + stepSize >= length || index + stepSize < 0)
  {
    index = index - stepSize;
  }
  else
  {
    index = index + stepSize;
  }
}

// called on frame updates
function onUpdate(framework) {

  if (Math.abs(Date.now() - startTime) >= timeInterval)
  {
    order[index].play();
    
    /*
    // to play a major every time
    if (index + 4 < length) {
      order[index + 4].play();
    }
    if (index + 7 < length)
    {
      order[index + 7].play();
    }
    */

    timeInterval = Math.floor(Math.random() * 2000) + 500;

    if (firstStep)
    {
      var directionChance = Math.floor(Math.random() * 2);
      if (directionChance == 0)
      {
        direction = 1;
      }
      else
      {
        direction = -1;
      }
      //0 to 2 not inclusive
      var majorOrMinor = Math.floor(Math.random() * 2);
      if (majorOrMinor == 0)
      {
        incrementIndex(direction * 4);
      }
      else
      {
        incrementIndex(direction * 3);
      }

    }
    else
    {
      incrementIndex(direction * 3);
    }

    startTime = Date.now();
    firstStep = !firstStep;
  }

}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
