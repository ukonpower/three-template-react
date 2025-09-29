import * as THREE from 'three';
import * as ORE from 'ore-three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { GlobalManager } from './GlobalManager';
import { RenderPipeline } from './RenderPipeline';
import { World } from './World';

// 独自型定義（ORE.LayerInfoの代替）
interface LayerSize {
	canvasAspectRatio: number;
	windowSize: THREE.Vector2;
	windowAspectRatio: number;
	canvasSize: THREE.Vector2;
	canvasPixelSize: THREE.Vector2;
	pixelRatio: number;
	portraitWeight: number;
	wideWeight: number;
}

interface AspectSetting {
	mainAspect: number;
	portraitAspect: number;
	wideAspect: number;
}

interface LayerInfo {
	name: string;
	size: LayerSize;
	aspectSetting: AspectSetting;
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	aspectRatio: number;
	pixelRatio: number;
}

interface TouchEventArgs {
	x: number;
	y: number;
	delta: { x: number; y: number };
}

export class MainScene {

	// Three.jsの基本コンポーネント
	public renderer: THREE.WebGLRenderer;
	public scene: THREE.Scene;
	public camera: THREE.PerspectiveCamera;
	
	// レイヤー情報
	public info: LayerInfo;
	
	// Uniformsとマネージャー
	public commonUniforms: ORE.Uniforms;

	private gManager: GlobalManager;
	private renderPipeline: RenderPipeline;

	private gltf?: GLTF;
	private world?: World;

	constructor() {

		// Three.jsの基本設定
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false,
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// シーンとカメラの初期化
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

		// レイヤー情報の初期化
		this.info = this.createLayerInfo();

		// 共通uniformsの初期化
		this.commonUniforms = ORE.UniformsLib.mergeUniforms({}, {
			time: { value: 0 },
			resolution: { value: new THREE.Vector2(this.info.width, this.info.height) },
		});

		/*-------------------------------
			Gmanager
		-------------------------------*/

		const gltfPath = '/scene.glb';

		this.gManager = new GlobalManager();

		this.gManager.assetManager.load({
			assets: [
				{ name: 'scene', path: gltfPath, type: 'gltf' }
			]
		});

		this.gManager.assetManager.addEventListener('loadMustAssets', () => {

			this.gltf = this.gManager.assetManager.getGltf("scene");

			this.initScene();
			this.onResize();

		});

		/*-------------------------------
			RenderPipeline
		-------------------------------*/

		this.renderPipeline = new RenderPipeline(this.renderer, this.commonUniforms);

	}

	/**
	 * LayerInfo構造体を作成
	 */
	private createLayerInfo(): LayerInfo {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const aspectRatio = width / height;
		const pixelRatio = window.devicePixelRatio;

		return {
			name: 'MainScene',
			width,
			height,
			aspectRatio,
			pixelRatio,
			canvas: this.renderer.domElement,
			size: {
				canvasAspectRatio: aspectRatio,
				windowSize: new THREE.Vector2(width, height),
				windowAspectRatio: aspectRatio,
				canvasSize: new THREE.Vector2(width, height),
				canvasPixelSize: new THREE.Vector2(width * pixelRatio, height * pixelRatio),
				pixelRatio,
				portraitWeight: aspectRatio < 1 ? 1 : 0,
				wideWeight: aspectRatio > 1 ? 1 : 0,
			},
			aspectSetting: {
				mainAspect: 16 / 9,
				portraitAspect: 9 / 16,
				wideAspect: 21 / 9,
			}
		};
	}

	onUnbind() {

		if (this.world) {

			this.world.dispose();

		}

	}

	private initScene() {

		/*-------------------------------
			World
		-------------------------------*/

		this.world = new World(this.camera, this.commonUniforms);

		if (this.gltf) {

			this.world.setGltf(this.gltf);

		}

		this.scene.add(this.world);

	}

	public animate(deltaTime: number) {

		// 共通uniformsの更新
		this.commonUniforms.time.value += deltaTime;

		if (this.gManager) {

			this.gManager.update(deltaTime);

		}

		if (this.world) {

			this.world.update(deltaTime);

		}

		this.renderPipeline.render(this.scene, this.camera);

	}

	public onResize() {

		// レイヤー情報の更新
		this.info = this.createLayerInfo();

		// レンダラーのサイズ更新
		this.renderer.setSize(this.info.width, this.info.height);
		this.renderer.setPixelRatio(this.info.pixelRatio);

		// カメラのアスペクト比更新
		this.camera.aspect = this.info.aspectRatio;
		this.camera.updateProjectionMatrix();

		// 解像度uniformの更新
		this.commonUniforms.resolution.value.set(this.info.width, this.info.height);

		if (this.world) {

			this.world.resize(this.info);

		}

		this.renderPipeline.resize(this.info);

	}

	public onHover(args: TouchEventArgs) {
	}

	public onTouchStart(args: TouchEventArgs) {
	}

	public onTouchMove(args: TouchEventArgs) {
	}

	public onTouchEnd(args: TouchEventArgs) {
	}

	public onWheelOptimized(event: WheelEvent) {
	}

}
