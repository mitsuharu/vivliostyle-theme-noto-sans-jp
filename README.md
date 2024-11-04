# @mitsuharu/vivliostyle-theme-noto-sans-jp

[![npm: version](https://flat.badgen.net/npm/v/@mitsuharu/vivliostyle-theme-noto-sans-jp)](https://npmjs.com/package/@mitsuharu/vivliostyle-theme-noto-sans-jp)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@mitsuharu/vivliostyle-theme-noto-sans-jp)](https://npmjs.com/package/@mitsuharu/vivliostyle-theme-noto-sans-jp)
![npm: license](https://flat.badgen.net/npm/license/@mitsuharu/vivliostyle-theme-noto-sans-jp)

フォントを Noto Sans JP と Noto Sans Mono に設定する Vivliostyle のテーマです。フォントのみを対象としているため、他のテーマとの併用は必須です。

This is a theme that sets fonts to Noto Sans JP and Noto Sans Mono. MUST use it with other themes.

## Fonts

Google Fonts の Noto Sans JP と Noto Sans Mono を利用しています。Google Fonts のライセンスは商用利用、印刷、再配布を許可しています。

## Install

```shell
npm install @mitsuharu/vivliostyle-theme-noto-sans-jp
```

or

```shell
yarn add @mitsuharu/vivliostyle-theme-noto-sans-jp
```

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-techbook'
    '@mitsuharu/vivliostyle-theme-noto-sans-jp',
  ],
};
```

## Anotation

- 数学表示で LaTeX 記法を利用すると T3Font (Type 3 font) が利用されます。また、このフォントは PDF に埋め込まれていません。Adobe Acrobat Pro などでアウトライン化してください。
- 図名などにおいて、全角と半角の間に Times フォントが利用されます。その Times フォントはおそらくゼロ幅かつ埋め込まれているので、問題ないと考える。

## Develop

### Files

```
vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp
├── LICENSE
├── README.md
├── example
│   ├── assets                            // auto generated
│   │   └── Logo (Mark + Type).png        // auto generated
│   └── default.md                        // 🖋
├── package.json
├── theme.css                             // 🖋
└── vivliostyle.config.js
```

**example**: Contain sample manuscripts using your theme.

### Commands

Run `vivliostyle preview` to preview your `theme.css`.

To watch file changes, use `preview` script.

```bash
npm run preview
# or
yarn preview
```

You can specify your CSS file and manuscript file for preview in vivliostyle.config.js:

```js
module.exports = {
  language: 'ja',
  theme: [
    'node_modules/@vivliostyle/theme-base',
    'node_modules/@vivliostyle/theme-techbook',
    '.'
  ],
  entry: [
      'example/default.md',
      // and more...
  ],
}
```

Run `vivliostyle-theme-scripts validate` before publishing your package.

```bash
npm run validate
# or
yarn validate
```
