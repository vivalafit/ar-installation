var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

var markerRoot1, markerRoot2;

var mesh1, mesh2;

//TODO: fix here - https://poletracker.atlassian.net/jira/software/projects/POLE/boards/1?selectedIssue=POLE-31
// function startCamera () {
// 	console.log("scene:", scene)
// 	if (scene === undefined) {
// 		initialize();
// 		animate();
// 	}
// }

//TODO: try this
// window.onpopstate = () => {
// 	navigate("/");
// }

initialize();
animate();

//TODO: add possibility to use with multiple markers
// addVideos();
// function addVideos() {
// 	//Test with 1 sec delay
// 	setTimeout(() => {
// 		$("body").append(`
// 			<video id="video" autoplay muted loop="" crossorigin="anonymous" webkit-playsinline="" style="display: none">
// 				<source src="videos/gepard.mp4" type="video/mp4">
// 			</video>
// 		`);
// 		// build markerControls
// 		console.log("arToolkitContext:", arToolkitContext)
// 		markerRoot2 = new THREE.Group();
// 		scene.add(markerRoot2);
// 		let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
// 			type: 'pattern', patternUrl: "./data/pattern-sun.patt",
// 		})

// 		let geometry2 = new THREE.PlaneBufferGeometry(2,2, 4,4);

// 		let video = document.getElementById( 'video' );
// 		console.log("test vid:", video)
// 		let texture2 = new THREE.VideoTexture( video );
// 		texture2.minFilter = THREE.LinearFilter;
// 		texture2.magFilter = THREE.LinearFilter;
// 		texture2.format = THREE.RGBFormat;
// 		let material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
		
// 		mesh2 = new THREE.Mesh( geometry2, material2 );
// 		mesh2.rotation.x = -Math.PI/2;
		
// 		markerRoot2.add( mesh2 );
// 	}, 1000);
// }

function initialize()
{	
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	//TODO: keep an eye on that one.
	renderer.setSize( 512, 512 );

	//append it elsewhere - fix here
	document.getElementsByClassName("canvas-place")[0].appendChild(renderer.domElement);
	//document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	
	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: './data/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls
	// markerRoot1 = new THREE.Group();

	// scene.add(markerRoot1);
	
	// let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
	// 	type: 'pattern', patternUrl: "./data/hiro.patt",
	// })
	// let geometry1 = new THREE.PlaneBufferGeometry(1,1, 4,4);
	// let loader = new THREE.TextureLoader();
	// let texture = loader.load('images/hero.jpeg', render );
	// let material1 = new THREE.MeshBasicMaterial( { map: texture } );
	
	// mesh1 = new THREE.Mesh( geometry1, material1 );
	// mesh1.rotation.x = -Math.PI/2;
	
	// markerRoot1.add( mesh1 );

		//build markerControls
		console.log("arToolkitContext:", arToolkitContext)
		markerRoot2 = new THREE.Group();
		scene.add(markerRoot2);
		let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
			type: 'pattern', patternUrl: "./data/pattern-sun.patt",
		})

		let geometry2 = new THREE.PlaneBufferGeometry(2,2, 4,4);

		let video = document.getElementById( 'video' );
		console.log("test vid:", video)
		let texture2 = new THREE.VideoTexture( video );
		texture2.minFilter = THREE.LinearFilter;
		texture2.magFilter = THREE.LinearFilter;
		texture2.format = THREE.RGBFormat;
		let material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
		
		mesh2 = new THREE.Mesh( geometry2, material2 );
		mesh2.rotation.x = -Math.PI/2;
		
		markerRoot2.add( mesh2 );

}

function update()
{
	if($(".canvas-place video").length === 0 && $("video").length > 0) {
		$("video").detach().appendTo('.canvas-place')
	}
	// update artoolkit on every frame
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
}

function render()
{
	renderer.render( scene, camera );
}

function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}
