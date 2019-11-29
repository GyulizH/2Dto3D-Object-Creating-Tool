var scene3d = document.getElementById("scene3d")
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth/2)/window.innerHeight, 0.1, 1000 );
//var controls = new THREE.TrackballControls(camera)

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 3 ] = new THREE.PointLight( 0xffffff, 5, 0 );
lights[ 4 ] = new THREE.DirectionalLight( 0xffffff, 1 );
lights[ 5 ] = new THREE.AmbientLight( 0xffffff, 0.8 );
lights[ 6 ] = new THREE.AmbientLight( 0xffffff, 0.3 );
lights[ 7 ] = new THREE.AmbientLight( 0xffffff, 0.3 );


lights[ 0 ].position.set( 0, 300, 0 );
lights[ 1 ].position.set( 100, 300, 500);
lights[ 2 ].position.set( - 100, - 300, - 500);
lights[ 3 ].position.set( 0, - 300, - 500 );
lights[ 4 ].position.set( 0, - 95, - 800 );
lights[ 5 ].position.set( 0, - 300, - 1000 );
lights[ 6 ].position.set(  window.innerWidth/2,  window.innerHeight/2 , -1000 );
lights[ 7].position.set( 100, 300, 500);

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );
scene.add( lights[ 3 ] );
scene.add( lights[ 4 ] );
scene.add( lights[ 5 ] );
scene.add( lights[ 6 ] );
scene.add( lights[ 7 ] );


var renderer = new THREE.WebGLRenderer();
scene3d.appendChild(renderer.domElement);
renderer.setSize( window.innerWidth/2, window.innerHeight);
camera.position.z = 450;
camera.position.y = 0;
//camera.lookAt(0, 0, 0);

var material = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
var points = [];
for ( var i = 0; i < 10; i ++ ) {
  points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
controls = new THREE.OrbitControls(camera,renderer.domElement)
addNewShape(points);

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  //shape.rotation.x += 0.005;

  if(rotateAni){
    shape.rotation.y += 0.005;
    shape.rotation.z += 0.005;
  }
  shape.scale.x = 1;
  shape.scale.y = 1;
  shape.scale.z = 1;
};
animate();

function generateGeometry(points){
  var geometry = new THREE.LatheGeometry( points, 20,0, 2 * Math.PI );
  return geometry;
}
var shape;

function addNewShape(points){
  var geometry = generateGeometry(points);
   shape = new THREE.Mesh( geometry, material );
  for (let i = scene.children.length - 1; i >= 0; i--) {
      if(scene.children[i].type === "Mesh")
          scene.remove(scene.children[i]);
  }
  scene.add( shape );
}
