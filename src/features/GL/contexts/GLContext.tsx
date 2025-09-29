import { createContext } from 'react';
// HooksContext型は src/global.d.ts で定義されているグローバル型

import { useGLContext } from '../hooks/useGLContext';

// GLコンテキストの型定義
export type TGLContext = HooksContext<typeof useGLContext>;

// GLコンテキスト
export const GLContext = createContext<TGLContext>( {} );
