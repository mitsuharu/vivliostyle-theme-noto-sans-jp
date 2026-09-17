# AGENTS.md

このリポジトリで作業する AI エージェント向けの案内です。人間が読んでも構いません。

## このリポジトリについて

`@mitsuharu/vivliostyle-theme-noto-sans-jp` は、[Vivliostyle](https://vivliostyle.org/) の文書全体の
フォントを Noto Sans JP と Noto Sans Mono に設定するためのテーマ（CSS パッケージ）です。
フォント設定しか持たないので、**他のテーマと併用する前提**です。

フォントファイル（`fonts/`）をパッケージに同梱しているため、
ビルド環境に日本語フォントが入っていなくても文字化けしません。
GitHub Actions の ubuntu runner のように日本語フォントがない環境で
PDF を作るときに効きます。

Vivliostyle Themes **v3**（`@vivliostyle/theme-base` 3.x）系のテーマです。

## ファイル構成

```text
.
├── theme.css                   # フォント用の変数を設定する。ここが主役
├── fonts/
│   ├── noto-sans-jp.css        # @font-face の定義
│   ├── noto-sans-mono.css      # @font-face の定義
│   ├── Noto_Sans_JP/           # フォントファイル本体
│   └── Noto_Sans_Mono/         # フォントファイル本体
├── vivliostyle.config.js       # example をビルドするための設定
├── example/
│   └── default.md              # 見た目を確認するためのサンプル原稿
├── package.json
└── .github/workflows/          # CI
```

## 開発の進め方

### コマンド

```bash
yarn install            # 依存パッケージのインストール
yarn preview            # ブラウザで example をプレビューする（変更を監視する）
yarn pdf                # example から dist/book.pdf を作る
yarn open               # 作成した PDF を開く
yarn check              # biome による整形・リントのチェック
yarn check-write        # biome で自動修正する
yarn validate           # Vivliostyle のテーマパッケージとして正しいか検証する
```

### theme.css を編集するときの方針

- このテーマは**フォントの設定だけ**を持ちます。体裁の調整は他のテーマの仕事です。
- v3 のデザイントークン `--vs-font-family` と `--vs-font-family-monospace` を設定します。
- あわせて `--vs--monospace-font-family` も明示的に上書きします。
  theme-base v3 の既定値は `var(--vs-font-family-monospace)` ですが、
  `@vivliostyle/theme-techbook` のように `--vs--monospace-font-family` を直接指定する
  テーマと併用すると、デザイントークンだけでは効きません。
- 依存パッケージのバージョンは `package.json` で**固定**します（`^` や `>=` を使わない）。

### フォントを追加・変更するとき

- フォントファイルは `fonts/<Family_Name>/` に置き、`@font-face` を
  `fonts/<family>.css` に定義して `theme.css` から `@import` します。
- `package.json` の `files` に `fonts` が含まれていることを確認してください。
  含まれていないと npm 公開時にフォントが同梱されません。
- ライセンス（OFL.txt）も一緒に同梱します。
- Variable Font はファイル1つで済みますが、**PDF に埋め込まれない**ので static を使います。

### 見た目を確認する

```bash
yarn pdf && yarn open
```

フォントが実際に PDF へ埋め込まれたかは、埋め込みフォント名で確認できます。

```bash
python3 -c "
import zlib, re
data = open('dist/book.pdf','rb').read()
out = []
for m in re.finditer(rb'stream\r?\n', data):
    s = m.end(); e = data.find(b'endstream', s)
    try: out.append(zlib.decompress(data[s:e]))
    except Exception: pass
blob = b'\n'.join(out)
print(sorted(n.decode() for n in set(re.findall(rb'/BaseFont\s*/([A-Za-z0-9+#,._-]+)', blob))))
"
```

`NotoSansJP-*` と `NotoSansMono-*` が出れば意図どおりです。

## コミットと PR

- **機能や目的ごとにコミットを分ける**。1つのコミットに複数の目的を混ぜない。
- コミットメッセージは日本語。1行目は要約、空行を挟んで本文に「何を」「なぜ」を書く。
- 変更は直接 `main` に push せず、ブランチを切って PR で入れる。
- ブランチ名は `feature/...` や `fix/...` の形式にする。
- PR の本文には、変更内容に加えて**見た目にどう影響するか**を書く。

## CI

| ワークフロー | 実行タイミング | 内容 |
| :--- | :--- | :--- |
| `Build and Attach PDF on Pull-Request` | PR | example から PDF を作り、変更前の PDF と一緒に PR へ添付する |
| `Check` | `main` への push / PR | `yarn check`、`yarn validate`、`npm pack --dry-run` |
| `Check npm packages by AikidoSec Safe Chain` | 依存関係を変える PR | 悪意ある npm パッケージが混ざっていないか検査する |
| `Publish to npm and Release` | タグ push / 手動実行 | npm への公開と GitHub Release の作成 |

GitHub Actions はサプライチェーン対策のためコミット SHA で固定し、
`# vX.Y.Z` のコメントを添えます。更新は Dependabot に任せます。

`.yarnrc.yml` の `npmMinimalAgeGate` は `3d` です。
公開から 3 日経っていない npm パッケージはインストールされません。

## リリース手順

1. `package.json` の `version` を上げる PR を作ってマージする。
2. `main` に対して `Publish to npm and Release` ワークフローを手動実行し、
   `package.json` と同じバージョンを入力する。
   （または同じバージョンのタグを push する）
3. ワークフローがタグの作成、npm への公開、GitHub Release の作成まで行う。

npm への公開は OIDC による Trusted Publishing を使うため、トークンの設定は不要です。

## 関連リポジトリ

- [vivliostyle-theme-iosdc-pamphlet](https://github.com/mitsuharu/vivliostyle-theme-iosdc-pamphlet) — iOSDC パンフレット用テーマ。このテーマと併用する
- [iosdc-pamphlet-template](https://github.com/mitsuharu/iosdc-pamphlet-template) — 両テーマを使う原稿のテンプレート
