import * as THREE from 'three';

// GLCoreで使用される共通のイベント型定義

/**
 * 更新イベント
 * フレーム毎の更新処理で使用される
 */
export interface UpdateEvent {
	deltaTime: number;
	time: number;
}

/**
 * リサイズイベント
 * 画面サイズ変更時に使用される
 */
export interface ResizeEvent {
	width: number;
	height: number;
	aspectRatio: number;
	pixelRatio: number;
	canvasPixelSize: THREE.Vector2;
	portraitWeight: number;
}
