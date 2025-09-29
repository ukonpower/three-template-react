# コードスタイルと規約

## インデント
- **タブ文字を使用** (`"indent": ["error", "tab"]`)
- スペースではなくタブでインデント

## TypeScript設定
- **strict mode**: 有効
- **target**: ES2020
- **module**: ESNext
- **JSX**: react-jsx
- **baseUrl**: `./` でパスエイリアス `~/*` を `./src/*` にマッピング

## ESLint設定
### 使用している設定
- `mdcs` - カスタム設定
- `eslint:recommended`
- `@typescript-eslint/recommended`
- `react-hooks/recommended`

### 主要なルール
- **import/order**: インポート文の順序を強制
  - builtin → external → internal → parent → sibling → index → object → type
  - グループ間は改行必須
  - アルファベット順でソート
- **no-multiple-empty-lines**: 複数の空行を禁止
- **@typescript-eslint/no-unused-vars**: 未使用変数警告を無効化
- **@typescript-eslint/no-explicit-any**: any型の使用を許可

## ファイル構成規約
### コンポーネント構造
```
src/
├── components/
│   ├── ui/              # 再利用可能なUIコンポーネント
│   │   ├── Parts/       # 基本的なUI部品
│   │   └── GLCanvas/    # 3D描画用コンポーネント
│   └── pages/           # ページコンポーネント
├── hooks/               # カスタムフック
│   └── useGL/          # WebGL/Three.js関連フック
├── glsl/               # GLSLシェーダー
└── styles/             # スタイルファイル
    └── common/         # 共通スタイル
```

### ファイル命名規則
- コンポーネント: `index.tsx` + `index.module.scss`
- TypeScript: PascalCase（コンポーネント名）
- SCSS: CSS Modules形式

## インポート規約
- パスエイリアス `~/` を使用してsrcディレクトリを参照
- ESLintのimport/orderルールに従ってインポート順序を整理
- グループ間は改行で区切る