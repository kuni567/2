# TouchTranslate

英文を入力すると、各単語をタッチすることで単語ごとの翻訳と詳細情報が表示されるインタラクティブな学習ツールです。

## 特徴

- 英文をシンプルに入力
- 単語をタッチして翻訳を表示
- 詳細情報パネルで代替訳や例文を確認
- レスポンシブデザイン（PC、タブレット、スマートフォン対応）

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 使用技術

- Next.js
- React
- TypeScript
- Tailwind CSS
- DeepL API（翻訳機能）

## GitHub Pagesへのデプロイ方法

このプロジェクトはGitHub Pagesにデプロイできます：

1. GitHubにリポジトリを作成してプッシュします
2. gh-pagesパッケージをインストール：`npm install --save-dev gh-pages`
3. 以下のコマンドでデプロイ：`npm run deploy`
4. 数分後、`https://あなたのユーザー名.github.io/touch-translate/`でアクセス可能になります

## APIキー情報

このアプリケーションはDeepL APIを使用しています：

```
API_KEY: 66cf6725-b789-42f6-a417-178152a11208:fx
```

**注意**: 実際の商用環境では、APIキーの管理により注意が必要です。

## ライセンス

MITライセンス 