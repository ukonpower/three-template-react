# 推奨コマンド一覧

## 開発コマンド
```bash
# 開発サーバー起動（ホットリロード付き）
npm run dev

# プロダクションビルド
npm run build

# ビルド後のプレビュー
npm run preview
```

## コード品質管理
```bash
# ESLintによるコードチェック
npm run lint

# TypeScriptコンパイルチェック
npx tsc --noEmit
```

## パッケージ管理
```bash
# 依存関係のインストール
npm install

# パッケージの追加
npm install <package-name>

# 開発用パッケージの追加
npm install -D <package-name>
```

## Gitコマンド
```bash
# 変更状況確認
git status

# ファイルをステージング
git add .

# コミット
git commit -m "コミットメッセージ"

# ブランチ確認
git branch

# ブランチ切り替え
git checkout <branch-name>
```

## システムコマンド（Linux）
```bash
# ディレクトリ内容表示
ls -la

# ディレクトリ移動
cd <directory>

# ファイル検索
find . -name "*.tsx"

# テキスト検索
grep -r "検索文字列" src/
```