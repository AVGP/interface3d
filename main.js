var THREE = require('three'),
    World = require('three-world');

var geometry = new THREE.SphereGeometry(5, 32, 32),
    anchor   = new THREE.Object3D();

var currentIndex = 0, rounds = 0;

function onRendered() {
  var boxes = anchor.children;
  for(var i=0; i < boxes.length; i++) {
    boxes[i].position.z -= 0.2;
  }
}

World.init({ camDistance: 200, renderCallback: onRendered });
World.add(anchor);
World.startRenderLoop();

var scanRounds = [];

var SERVICES = {
  ssh: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  http: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  ftp: new THREE.MeshBasicMaterial({ color: 0x0000ff })
}

setTimeout(function addScan() {
  var service = ['ssh', 'http', 'ftp'][Math.floor(Math.random() * 3)];
  var scanBox = new THREE.Mesh(geometry, SERVICES[service]);
  scanBox.position.set(-50 + 12 * (currentIndex % 10), -50 + 12 * Math.floor(currentIndex / 10), 0);
  anchor.add(scanBox);
  currentIndex = ++currentIndex % 100;
  setTimeout(addScan, Math.random() * 500);
}, 100);
