# Electron Forge: AppImage

This is an [electron-forge](https://www.electronforge.io/) builder for [AppImage](https://appimage.org/).

This project is based on several existing projects:
- [electron-forge-maker-appimage](https://www.npmjs.com/package/electron-forge-maker-appimage)
- [saleae/electron-forge-maker-appimage](https://github.com/saleae/electron-forge-maker-appimage)
- [@pengx17/electron-forge-maker-appimage](https://www.npmjs.com/package/@pengx17/electron-forge-maker-appimage)
- [@forkprince/electron-forge-maker-appimage](https://www.npmjs.com/package/@forkprince/electron-forge-maker-appimage)

## Usage

```bash
npm install @holepunchto/electron-forge-maker-appimage --save-dev
```

## forge.config.js

```js
makers: [
  {
    name: "@holepunchto/electron-forge-maker-appimage",
    platforms: ["linux"],
    config: {
      productName: "Re:Lunatic Player",
      icons: [
        {
          file: "./src/img/logo.png",
          size: 256
        }
      ]
    }
  }
];
```
