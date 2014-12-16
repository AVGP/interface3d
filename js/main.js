var THREE = require('three'),
    World = require('three-world'),
    ObjLoader = require('./OBJMTLLoader'),
    Loading = require('./loading');

Loading.start(document.getElementById("loading"));

function onRendered() {
  if(cam) cam.rotation.y += 0.005;
}

World.init({ camDistance: 0, renderCallback: onRendered, clearColor: 0xffffff });
World.startRenderLoop();

var loader = new ObjLoader(), mesh, anchor, cam = World.getCamera();

anchor = new THREE.Object3D();

loader.load('model/TV2.obj', 'model/TV2.mtl', function(tv) {
  tv.rotation.set(0, -Math.PI/2, 0);
  tv.scale.set(18, 18, 18);

  for(var side=0; side<4; side++) {
    var sideAnchor = new THREE.Object3D();
    for(var i=0; i<100; i++) {
      var tmp = tv.clone();
      tmp.position.set(-250 + (i % 10) * 50, -250 + Math.floor(i / 10) * 50, -275 );
      sideAnchor.add(tmp);
    }
    sideAnchor.rotation.y = side * (Math.PI/2);
    anchor.add(sideAnchor);
  }
  Loading.stop();

});
World.add(anchor);

/*
setTimeout(function addScan() {
  var service = ['ssh', 'http', 'ftp'][Math.floor(Math.random() * 3)];
  var scanBox = new THREE.Mesh(geometry, SERVICES[service]);
  scanBox.position.set(-50 + 12 * (currentIndex % 10), -50 + 12 * Math.floor(currentIndex / 10), 0);
  anchor.add(scanBox);
  currentIndex = ++currentIndex % 100;
  setTimeout(addScan, Math.random() * 500);
}, 100);
*/
