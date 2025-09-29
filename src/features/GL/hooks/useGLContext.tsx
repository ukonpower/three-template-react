import { useEffect, useState } from 'react';

import { GLCore } from '../services/GLCore';


/**
 * GLインスタンスを管理するコンテキスト用フック
 * GLContextProviderで使用される
 */
export const useGLContext = () => {

	const [ gl, setGL ] = useState<GLCore>();

	useEffect( () => {

		// GLインスタンスを作成
		const gl = new GLCore();
		setGL( gl );

		return () => {

			// クリーンアップ時にGLインスタンスを破棄
			gl.dispose();
			setGL( undefined );

		};

	}, [] );

	return {
		gl
	};

};
