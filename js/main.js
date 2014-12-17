var THREE = require('three'),
    World = require('three-world'),
    ObjLoader = require('./OBJMTLLoader'),
    Loading = require('./loading'),
    Controls = require('./kinetic-controls'),
    addLights = require('./lights'),
    DynamicTexture = require('./dynamic-texture'),
    Skybox = require('./skybox');

Loading.start(document.getElementById("loading"));

World.init({ camDistance: 0, clearColor: 0xffffff, ambientLightColor: 0xcccccc, farPlane: 5000 });
World.startRenderLoop();

Controls.init(World.getCamera());
addLights(World, 0x006600, 0x000066);

var loader = new ObjLoader(), mesh, anchor, cam = World.getCamera();

cam.rotation.order = 'YXZ';

var dynTex = new DynamicTexture(512, 512);
dynTex.context.font	= "bolder 36px Verdana";

var agent = new Image();
agent.src = "agent_smith.jpg";

agent.addEventListener('load', function() {
  dynTex.clear('green')
    .drawImage(agent, 0, 0, 512, 512)
    .drawText("Hello, Mr. Anderson...", undefined, 420, 'white');
});

var screen = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 2.2, 2.2),
  new THREE.MeshPhongMaterial({map: dynTex.texture })
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

Skybox(World, 'cyber3.jpg');
