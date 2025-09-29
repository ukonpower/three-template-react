import { MainScene } from './MainScene';
import { GlobalManager } from './MainScene/GlobalManager';
import { AssetManager } from './MainScene/GlobalManager/AssetManager';

declare global {
	interface Window {
		glCanvas: {
			gManager: GlobalManager;
			assetManager: AssetManager;
			isSP: boolean;
			mainScene: MainScene;
		}
	}
}

export class GLCore {

	public canvas: HTMLCanvasElement;
	public scene: MainScene;

	// アニメーションループ管理
	private animationId: number | null = null;
	private lastTime: number = 0;

	// イベント管理
	private pointerElement: HTMLElement | null = null;
	private resizeObserver: ResizeObserver | null = null;

	constructor() {

		window.glCanvas = {} as any;

		/*------------------------
			init Scene
		------------------------*/

		this.scene = new MainScene();
		this.canvas = this.scene.renderer.domElement;

		// アニメーションループ開始
		this.startAnimation();

		// リサイズ監視開始
		this.setupResizeObserver();

	}

	/**
	 * アニメーションループを開始
	 */
	private startAnimation() {

		const animate = ( currentTime: number ) => {

			// deltaTimeを計算（ミリ秒を秒に変換）
			const deltaTime = this.lastTime ? ( currentTime - this.lastTime ) / 1000 : 0;
			this.lastTime = currentTime;

			// シーンのアニメーション更新
			this.scene.animate( deltaTime );

			// 次のフレームをリクエスト
			this.animationId = requestAnimationFrame( animate );

		};

		this.animationId = requestAnimationFrame( animate );

	}

	/**
	 * リサイズ監視を設定
	 */
	private setupResizeObserver() {

		this.resizeObserver = new ResizeObserver( () => {

			this.scene.onResize();

		} );

		// windowの監視を開始
		this.resizeObserver.observe( document.body );

	}

	/**
	 * ポインターイベントを処理する要素を設定
	 */
	public setPointerElement( elm: HTMLElement ) {

		// 既存のリスナーを削除
		if ( this.pointerElement ) {

			this.removePointerEventListeners();

		}

		this.pointerElement = elm;
		this.addPointerEventListeners();

	}

	/**
	 * ポインターイベントリスナーを追加
	 */
	private addPointerEventListeners() {

		if ( ! this.pointerElement ) return;

		let isPointerDown = false;
		let lastPointer = { x: 0, y: 0 };

		// マウスイベント
		this.pointerElement.addEventListener( 'mouseenter', ( e ) => {

			const rect = this.pointerElement!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			this.scene.onHover( {
				x,
				y,
				delta: { x: 0, y: 0 }
			} );

		} );

		this.pointerElement.addEventListener( 'mousemove', ( e ) => {

			const rect = this.pointerElement!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const delta = {
				x: x - lastPointer.x,
				y: y - lastPointer.y
			};

			lastPointer = { x, y };

			if ( isPointerDown ) {

				this.scene.onTouchMove( { x, y, delta } );

			} else {

				this.scene.onHover( { x, y, delta } );

			}

		} );

		this.pointerElement.addEventListener( 'mousedown', ( e ) => {

			isPointerDown = true;
			const rect = this.pointerElement!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			lastPointer = { x, y };
			this.scene.onTouchStart( {
				x,
				y,
				delta: { x: 0, y: 0 }
			} );

		} );

		this.pointerElement.addEventListener( 'mouseup', ( e ) => {

			isPointerDown = false;
			const rect = this.pointerElement!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			this.scene.onTouchEnd( {
				x,
				y,
				delta: { x: 0, y: 0 }
			} );

		} );

		// ホイールイベント
		this.pointerElement.addEventListener( 'wheel', ( e ) => {

			this.scene.onWheelOptimized( e );

		} );

		// タッチイベント（モバイル対応）
		this.pointerElement.addEventListener( 'touchstart', ( e ) => {

			e.preventDefault();
			isPointerDown = true;
			const touch = e.touches[ 0 ];
			const rect = this.pointerElement!.getBoundingClientRect();
			const x = touch.clientX - rect.left;
			const y = touch.clientY - rect.top;

			lastPointer = { x, y };
			this.scene.onTouchStart( {
				x,
				y,
				delta: { x: 0, y: 0 }
			} );

		} );

		this.pointerElement.addEventListener( 'touchmove', ( e ) => {

			e.preventDefault();
			const touch = e.touches[ 0 ];
			const rect = this.pointerElement!.getBoundingClientRect();
			const x = touch.clientX - rect.left;
			const y = touch.clientY - rect.top;
			const delta = {
				x: x - lastPointer.x,
				y: y - lastPointer.y
			};

			lastPointer = { x, y };
			this.scene.onTouchMove( { x, y, delta } );

		} );

		this.pointerElement.addEventListener( 'touchend', ( e ) => {

			e.preventDefault();
			isPointerDown = false;

			// タッチ終了時は最後の座標を使用
			this.scene.onTouchEnd( {
				x: lastPointer.x,
				y: lastPointer.y,
				delta: { x: 0, y: 0 }
			} );

		} );

	}

	/**
	 * ポインターイベントリスナーを削除
	 */
	private removePointerEventListeners() {

		if ( ! this.pointerElement ) return;

		// クローンを作成して全てのリスナーを削除
		const newElement = this.pointerElement.cloneNode( true );
		this.pointerElement.parentNode?.replaceChild( newElement, this.pointerElement );
		this.pointerElement = newElement as HTMLElement;

	}

	/**
	 * リソースを破棄
	 */
	public dispose() {

		// アニメーションループを停止
		if ( this.animationId !== null ) {

			cancelAnimationFrame( this.animationId );
			this.animationId = null;

		}

		// リサイズ監視を停止
		if ( this.resizeObserver ) {

			this.resizeObserver.disconnect();
			this.resizeObserver = null;

		}

		// ポインターイベントリスナーを削除
		if ( this.pointerElement ) {

			this.removePointerEventListeners();
			this.pointerElement = null;

		}

		// シーンのリソースを破棄
		if ( this.scene ) {

			this.scene.onUnbind();

		}

	}

}
