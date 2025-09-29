import { useContext } from 'react';

import { GLContext } from '../contexts/GLContext';

/**
 * GLインスタンスを取得するフック
 * GLContextから直接glを取得する
 */
export const useGL = () => {

	const { gl } = useContext( GLContext );

	return gl;

};
