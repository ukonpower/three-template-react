import { useEffect, useState } from 'react';

import { Engine } from '../core';

/**
 * GLインスタンスを管理するコンテキスト用フック
 * GLContextProviderで使用される
 */
export const useGLContext = () => {

	const [ gl, setGL ] = useState<Engine>();

	useEffect( () => {

		// GLインスタンスを作成
		const gl = new Engine();
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