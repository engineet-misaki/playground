This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

- アポロのサンプルプロジェクト

- スタック

  - "next": "13.4.6"
  - "graphql": "^16.6.0"
  - "@apollo/client": "^3.7.15"
  - "@apollo/server": "^4.7.4"

- 気になる点

  - リクエストメソッドが POST になっている
    - 結論：グラフ QL はそういうものかもしれない

- これからやりたいこと

  - いいね機能の付いたメモ帳アプリの作成
    - 必要作業
      - HTML の作成
      - メモの取得
      - メモの作成
      - メモの編集
      - メモの削除
      - いいねの追加
      - いいねの削除
    - 身につくこと
      - アポロサーバーの理解
      - アポロクライアントの理解
      - グラフ QL の理解
      - next13 の理解
  - 最終的に書きたい記事
    - next13 と graphql の環境構築
