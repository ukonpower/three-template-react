# Three.js React Template プロジェクト概要

## プロジェクトの目的
- React + TypeScript + Viteを使用したThree.jsアプリケーションのテンプレート
- WebGL/Three.jsを活用した3Dグラフィックスの実装
- 高性能な3Dレンダリングパイプラインの構築

## Tech Stack
### Core
- **React**: 18.2.0 - UIライブラリ
- **TypeScript**: 5.2.2 - 型安全な開発
- **Vite**: 5.2.0 - 高速ビルドツール

### 3D Graphics
- **Three.js**: 0.164.0 - 3Dライブラリ
- **ore-three**: 5.0.0-beta2 - Three.js拡張
- **glpower**: 0.0.1 - GLライブラリ

### Styling
- **Sass**: 1.75.0 - CSS拡張
- **CSS Modules**: コンポーネント固有のスタイリング

### Development Tools
- **ESLint**: 8.57.0 - コード品質管理
- **TypeScript ESLint**: 7.2.0 - TypeScript用のリンター

## エントリーポイント
- `src/pages/index.tsx` - アプリケーションのメインエントリーポイント
- `index.html` - HTMLテンプレート（script src="/src/main.tsx"から修正済み）