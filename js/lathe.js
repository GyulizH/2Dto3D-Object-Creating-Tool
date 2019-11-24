var scene3d = document.getElementById("scene3d")
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//var controls = new THREE.TrackballControls(camera)
var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 3 ] = new THREE.PointLight( 0xffffff, 5, 0 );
lights[ 4 ] = new THREE.DirectionalLight( 0xffffff, 0.5 );

lights[ 0 ].position.set( 0, 300, 0 );
lights[ 1 ].position.set( 100, 300, 500);
lights[ 2 ].position.set( - 100, - 300, - 500);
lights[ 3 ].position.set( 0, - 300, - 500 );
lights[ 4 ].position.set( 0, - 95, - 800 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );
scene.add( lights[ 3] );
scene.add( lights[ 4] );


var renderer = new THREE.WebGLRenderer();
scene3d.appendChild(renderer.domElement);
renderer.setSize( window.innerWidth/2, window.innerHeight );
camera.position.z = 800;
camera.position.y = -95;

var material = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
var points = [];
for ( var i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
controls = new THREE.OrbitControls(camera,renderer.domElement)
//var controls = new THREE.ObjectControls(camera, renderer.domElement, myMesh);
addNewShape(points);

var animate = function () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	 shape.rotation.x += 0.01;
	 shape.rotation.y += 0.05;
	 //shape.rotation.z += 0.01;
};
animate();




function generateGeometry(points){
  var geometry = new THREE.LatheGeometry( points, 12,0, 2 * Math.PI );
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