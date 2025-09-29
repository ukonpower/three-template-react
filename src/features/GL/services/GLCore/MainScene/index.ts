import * as ORE from 'ore-three';
import * as THREE from 'three';

import { ResizeEvent, UpdateEvent } from '../types';

import { RenderPipeline } from './RenderPipeline';
import { World } from './World';

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


	// Uniformsとマネージャー
	public commonUniforms: ORE.Uniforms;

	private renderPipeline: RenderPipeline;

	private world?: World;

	constructor() {

		// Three.jsの基本設定
		this.renderer = new THREE.WebGLRenderer( {
			antialias: true,
			alpha: false,
		} );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// シーンとカメラの初期化
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

		// 共通uniformsの初期化
		this.commonUniforms = ORE.UniformsLib.mergeUniforms( {}, {
			time: { value: 0 },
			resolution: { value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
		} );

		/*-------------------------------
			RenderPipeline
		-------------------------------*/

		this.renderPipeline = new RenderPipeline( this.renderer, this.commonUniforms );

		// シーンの初期化
		this.initScene();
		this.onResize();

	}


	onUnbind() {

		if ( this.world ) {

			this.world.dispose();

		}

	}

	private initScene() {

		/*-------------------------------
			World
		-------------------------------*/

		this.world = new World( this.camera, this.commonUniforms );

		this.scene.add( this.world );

	}

	public animate( deltaTime: number ) {

		// 共通uniformsの更新
		this.commonUniforms.time.value += deltaTime;

		// GlobalManagerの代替処理が必要な場合はここに追加

		if ( this.world ) {

			// UpdateEventを作成してworldに渡す
			const updateEvent: UpdateEvent = {
				deltaTime,
				time: this.commonUniforms.time.value
			};

			this.world.update( updateEvent );

		}

		this.renderPipeline.render( this.scene, this.camera );

	}

	public onResize() {

		// サイズ情報を計算
		const width = window.innerWidth;
		const height = window.innerHeight;
		const aspectRatio = width / height;
		const pixelRatio = window.devicePixelRatio;

		// レンダラーのサイズ更新
		this.renderer.setSize( width, height );
		this.renderer.setPixelRatio( pixelRatio );

		// カメラのアスペクト比更新
		this.camera.aspect = aspectRatio;
		this.camera.updateProjectionMatrix();

		// 解像度uniformの更新
		this.commonUniforms.resolution.value.set( width, height );

		// ResizeEventを作成
		const resizeEvent: ResizeEvent = {
			width,
			height,
			aspectRatio,
			pixelRatio,
			canvasPixelSize: new THREE.Vector2( width * pixelRatio, height * pixelRatio ),
			portraitWeight: aspectRatio < 1 ? 1 : 0
		};

		if ( this.world ) {

			this.world.resize( resizeEvent );

		}

		this.renderPipeline.resize( resizeEvent );

	}

	public onHover( _args: TouchEventArgs ) {
	}

	public onTouchStart( _args: TouchEventArgs ) {
	}

	public onTouchMove( _args: TouchEventArgs ) {
	}

	public onTouchEnd( _args: TouchEventArgs ) {
	}

	public onWheelOptimized( _event: WheelEvent ) {
	}

}
