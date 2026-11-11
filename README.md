# Electron Forge: AppImage

This is an [electron-forge](https://www.electronforge.io/) builder for [AppImage](https://appimage.org/).

This project is based on several existing projects:
- [electron-forge-maker-appimage](https://www.npmjs.com/package/electron-forge-maker-appimage)
- [saleae/electron-forge-maker-appimage](https://github.com/saleae/electron-forge-maker-appimage)
- [@pengx17/electron-forge-maker-appimage](https://www.npmjs.com/package/@pengx17/electron-forge-maker-appimage)
- [@forkprince/electron-forge-maker-appimage](https://www.npmjs.com/package/@forkprince/electron-forge-maker-appimage)

## Requirements

- Electron Forge 8 (this package is ESM-only, as Forge 8 loads makers with `import()`)
- Node.js >= 22.13.0

For Electron Forge 7, use the 2.x releases of this package.

## Usage

```bash
npm install pear-electron-forge-maker-appimage --save-dev
```

## forge.config.js

```js
makers: [
  {
    name: 'pear-electron-forge-maker-appimage',
    platforms: ['linux'],
    config: {
      icons: [
        {
          file: 'build-assets/linux/assets/Keet/Keet-16x16.png',
          size: 16,
        },
        {
          file: 'build-assets/linux/assets/Keet/Keet-32x32.png',
          size: 32,
        },
        {
          file: 'build-assets/linux/assets/Keet/Keet-64x64.png',
          size: 64,
        },
        {
          file: 'build-assets/linux/assets/Keet/Keet-128x128.png',
          size: 128,
        },
        {
          file: 'build-assets/linux/assets/Keet/Keet-256x256.png',
          size: 256,
        },
      ],
    },
  },
]
```

Or instantiated as a class:

```js
import MakerAppImage from "pear-electron-forge-maker-appimage"

makers: [
  new MakerAppImage({
    icons: [
      { file: "build-assets/linux/assets/Keet/Keet-16x16.png", size: 16 },
      // ...
    ]
  }, ["linux"])
]
```
