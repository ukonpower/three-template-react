import { useContext, useRef, useEffect } from "react";

import style from './index.module.scss';

import { GLContext } from "~/hooks/useGL";

export const GLCanvas = () => {

	const { gl } = useContext( GLContext );
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		if ( gl && wrapperElmRef.current ) {

			const canvas = wrapperElmRef.current.querySelectorAll( 'canvas' );
			canvas.forEach( item => item.remove() );
			wrapperElmRef.current.appendChild( gl.canvas );
			gl.setPointerElement( wrapperElmRef.current );
			gl.scene.setWrapperElement( wrapperElmRef.current );

		}

	}, [ gl ] );

	return <div className={style.glCanvas} ref={wrapperElmRef}></div>;

};
