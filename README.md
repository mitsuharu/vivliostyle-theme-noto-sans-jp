# Vivliostyle Theme @mitsuharu/vivliostyle Theme Noto Sans Jp

[![npm: version](https://flat.badgen.net/npm/v/vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp)](https://npmjs.com/package/vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp)
[![npm: total downloads](https://flat.badgen.net/npm/dt/vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp)](https://npmjs.com/package/vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp)
![npm: license](https://flat.badgen.net/npm/license/vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp)

It uses Noto Sans JP and Noto Sans Mono.

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: 'vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp',
};
```

If you want to add your CSS:

```js
module.exports = {
  theme: [
    'vivliostyle-theme@mitsuharu/vivliostyle-theme-noto-sans-jp',
    // add your CSS 
  ],
};
```

## Dev

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
  language: 'en',
  theme: ['node_modules/@vivliostyle/theme-base', '.'],
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
