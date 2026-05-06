# Electron Forge: AppImage

This is an [electron-forge](https://www.electronforge.io/) builder for [AppImage](https://appimage.org/).

This project is based on several existing projects:
- [electron-forge-maker-appimage](https://www.npmjs.com/package/electron-forge-maker-appimage)
- [saleae/electron-forge-maker-appimage](https://github.com/saleae/electron-forge-maker-appimage)
- [@pengx17/electron-forge-maker-appimage](https://www.npmjs.com/package/@pengx17/electron-forge-maker-appimage)
- [@forkprince/electron-forge-maker-appimage](https://www.npmjs.com/package/@forkprince/electron-forge-maker-appimage)

## Usage

```bash
npm install @pear-/electron-forge-maker-appimage --save-dev
```

## forge.config.js

```js
makers: [
  {
    name: '@pear-/electron-forge-maker-appimage',
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
