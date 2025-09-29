import * as ORE from 'ore-three';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { ResizeEvent, UpdateEvent } from '../../types';

export class World extends THREE.Object3D {

	private _gltf?: GLTF;

	private camera: THREE.Camera;
	private _commonUniforms: ORE.Uniforms;

	private box: THREE.Mesh;

	constructor( camera: THREE.Camera, parentUniforms: ORE.Uniforms ) {

		super();

		this.camera = camera;

		this._commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		/*-------------------------------
			Light
		-------------------------------*/

		this.box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial() );
		this.add( this.box );

		this.camera.position.set( 0, 0, 5 );

	}

	public setGltf( gltf: GLTF ) {

		this._gltf = gltf;

		// this.add( this._gltf.scene );

	}

	public update( event: UpdateEvent ) {

		this.box.rotateY( event.deltaTime );
		this.box.rotateX( event.deltaTime * 0.1 );


	}

	public resize( _event: ResizeEvent ) {
	}

	public dispose() {
	}

}
