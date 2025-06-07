# Kansai Shukatsu Diagnosis

## 開発・動作手順

1. 必要パッケージインストール  
   `npm install`

2. 開発サーバ起動  
   `npm run dev`

3. 本番ビルド  
   `npm run build`

4. Discord通知用Webhookは  
   Vercelや環境変数`.env.local`で`DISCORD_WEBHOOK_URL`を設定

5. Vercelデプロイ時は「New Project」→このリポジトリ選択→環境変数にWebhook URL追加

---

## 必要ファイル

- `public/logo.png` … ロゴ画像
- `data/questions.ts` … 設問40問

---

## 質問や追加要望はChatGPTのチャットへ！
