<script lang="ts">
	import { onMount } from "svelte";
	import * as THREE from "three";
	import { OrbitControls } from "three/addons/controls/OrbitControls.js";

	let camera: THREE.PerspectiveCamera | undefined = $state();
	let controls: OrbitControls | undefined = $state();
	let renderer: THREE.WebGLRenderer | undefined = $state();
	let scene: THREE.Scene | undefined = $state();
	let container: HTMLDivElement | undefined = $state();
	let time = $state(performance.now());
	let { environment } = $props();
	$inspect(environment);

	onMount(() => {
		if (!container) {
			return;
		}
		console.log("hawooo");
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setAnimationLoop(animate);
		container.appendChild(renderer.domElement);

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.z = 0.01;

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableZoom = false;
		controls.enablePan = false;
		controls.enableDamping = true;
		controls.rotateSpeed = -0.25;

		const textures = getTexturesFromAtlasFile(`/SpatialEnvironments/${environment}`, 6);
		// const textures = [];
		// for (let i = 0; i < 6; i++) {
		// 	textures[i] = `/SpatialEnvironments/shanghai/${i}.png`;
		// }

		const materials = [];

		for (let i = 0; i < 6; i++) {
			materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
		}

		const skyBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
		skyBox.geometry.scale(1, 1, -1);
		scene.add(skyBox);

		window.addEventListener("resize", onWindowResize);
	});

	function getTexturesFromAtlasFile(atlasImgUrl: string, tilesNum: number) {
		const textures: THREE.Texture[] = [];

		const order = [0, 2, 4, 5, 3, 1];
		for (let i = 0; i < tilesNum; i++) {
			textures[i] = new THREE.Texture();
		}
		for (let i = 0; i < 6; i++) {
			new THREE.ImageLoader().load(`${atlasImgUrl}/${order[i]}.png`, (image) => {
				let canvas, context;
				const tileWidth = image.height;

				canvas = document.createElement("canvas");
				context = canvas.getContext("2d");
				canvas.height = tileWidth;
				canvas.width = tileWidth;
				if (context) {
					context.drawImage(image, 0, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
					context.rotate(90);
					// context.drawImage(
					// 	`${image}/${i}.png`,
					// 	0,
					// 	0,
					// 	tileWidth,
					// 	tileWidth,
					// 	0,
					// 	0,
					// 	tileWidth,
					// 	tileWidth,
					// );
				}
				textures[i].colorSpace = THREE.SRGBColorSpace;
				textures[i].image = canvas;
				textures[i].needsUpdate = true;
			});
		}
		return textures;
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function animate() {
		// controls.update();
		let difference = performance.now() / 1000 - time;
		time = performance.now() / 1000;
		renderer.render(scene, camera);
		camera.rotation.y -= 0.04 * difference;
		// camera.rotation.y -= 0.005;
		// camera.rotation.x -= 0.0005;
		// camera.rotation.z -= 0.005;
	}
</script>

<div class="spatial-environment" bind:this={container}></div>

<style lang="scss">
	.spatial-environment {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100%;
		filter: brightness(0.85);
		overflow: clip;
	}
</style>
