var THREE = require('three'),
    World = require('three-world'),
    ObjLoader = require('./OBJMTLLoader'),
    Loading = require('./loading'),
    Controls = require('./kinetic-controls');

Loading.start(document.getElementById("loading"));

World.init({ camDistance: 0, clearColor: 0xffffff });
World.startRenderLoop();
Controls.init(World.getCamera());

var loader = new ObjLoader(), mesh, anchor, cam = World.getCamera();

cam.rotation.order = 'YXZ';

var screen = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 2.2, 2.2),
  new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("fuckyea.png") })
);
screen.position.set(0.7, 1.2, 0);

anchor = new THREE.Object3D();

loader.load('model/TV2.obj', 'model/TV2.mtl', function(tv) {
  tv.rotation.set(0, -Math.PI/2, 0);
  tv.scale.set(18, 18, 18);
  tv.children[8].material.opacity = 0.25;
  tv.children[8].material.transparent = true;
  tv.children[8].material.needsUpdate = true;
  tv.add(screen);

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
