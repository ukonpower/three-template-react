# コードベース構造

## ディレクトリ構成

### ルートディレクトリ
```
three-template-react/
├── src/                    # ソースコード
├── node_modules/           # 依存関係
├── .git/                   # Gitリポジトリ
├── package.json            # プロジェクト設定
├── tsconfig.json           # TypeScript設定
├── vite.config.ts          # Vite設定
├── .eslintrc.cjs          # ESLint設定
└── index.html             # HTMLテンプレート
```

### src/ ディレクトリの詳細構造

#### pages/
- `index.tsx` - メインエントリーポイント
- `public/scene.glb` - 3Dシーンアセット

#### components/
##### ui/Parts/ - 再利用可能なUI部品
- `Panel/` - パネルコンポーネント
- `Button/` - ボタンコンポーネント
- `Input/` - 入力系コンポーネント群
  - `InputNumber/` - 数値入力
  - `InputText/` - テキスト入力
  - `InputSelect/` - セレクト
  - `InputCheckBox/` - チェックボックス
- `PanelContainer/` - パネルコンテナ
- `InputGroup/` - 入力グループ
- `Property/` - プロパティ表示
- `Picker/` - ピッカー
- `Icon/` - アイコン群

##### ui/GLCanvas/
- Three.js描画用のキャンバスコンポーネント

##### pages/
- `Top/` - トップページコンポーネント

#### hooks/
##### useGL/ - WebGL/Three.js関連
- `GL/` - GLコンテキスト管理
  - `MainScene/` - メインシーン
    - `RenderPipeline/` - レンダリングパイプライン
    - `CameraController/` - カメラ制御
    - `GlobalManager/` - グローバル管理
    - `World/` - ワールド管理

#### glsl/
- GLSL シェーダーファイル群
- ユーティリティ関数（ノイズ、イージング、数学関数など）

#### styles/
- `style.scss` - メインスタイル
- `common/` - 共通スタイル定義

## アーキテクチャの特徴

### React + Three.js 統合
- カスタムフック `useGL()` でWebGLコンテキストを管理
- Reactコンポーネント内でThree.jsシーンを制御
- GLContext.Providerでコンテキストを提供

### コンポーネント設計
- CSS Modulesによるコンポーネントスコープのスタイリング
- 各コンポーネントは `index.tsx` + `index.module.scss` の構成
- 再利用可能なUI部品の階層的な組織化

### 3Dグラフィックス処理
- カスタムレンダリングパイプライン
- シェーダー管理システム
- アセット管理（GLBファイルなど）