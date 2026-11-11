import { ForgePlatform } from "@electron-forge/shared-types";
import MakerBase, { MakerOptions } from "@electron-forge/maker-base";
import { buildLegacyFuse2AppImage, buildStaticRuntimeAppImage } from "app-builder-lib/out/targets/appimage/appImageUtil.js";
import { archFromString } from "builder-util";
import type { ToolsetConfig } from "app-builder-lib/out/configuration.js";
import { mkdirSync, existsSync, readFileSync, writeFileSync, rmSync } from "fs";
import { createRequire } from "node:module";
import path from "path";

const require = createRequire(import.meta.url);

export interface AppImageForgeConfig {
  icons?: { file: string; size: number }[];
  compression?: "gzip" | "zstd" | "xz";
  appimageToolVersion?: ToolsetConfig["appimage"];
}

export default class MakerAppImage extends MakerBase<AppImageForgeConfig> {
  name = "appImage";

  defaultPlatforms: ForgePlatform[] = ["linux"];

  isSupportedOnCurrentPlatform() {
    return process.platform === "linux";
  }

  async make({
    dir, // /home/build/Software/monorepo/packages/electron/out/name-linux-x64
    appName, // name
    makeDir, // /home/build/Software/monorepo/packages/electron/out/make
    targetArch, // x64
    packageJSON,
    targetPlatform, // linux
    forgeConfig
  }: MakerOptions) {
    const appPath = path.join(makeDir, `${appName}-${packageJSON.version}-${targetArch}.AppImage`);
    const executable = forgeConfig.packagerConfig.executableName || appName;

    const iconPath = path.join(path.dirname(require.resolve("app-builder-lib")), "../templates/icons/electron-linux");

    // Forge resolves the maker config into `this.config` right before `make()`, both for
    // string-name makers and for makers instantiated as a class.
    const icons = this.config?.icons?.length
      ? [...this.config.icons].sort((a, b) => a.size - b.size)
      : [
        { file: `${iconPath}/16x16.png`, size: 16 },
        { file: `${iconPath}/32x32.png`, size: 32 },
        { file: `${iconPath}/48x48.png`, size: 48 },
        { file: `${iconPath}/64x64.png`, size: 64 },
        { file: `${iconPath}/128x128.png`, size: 128 },
        { file: `${iconPath}/256x256.png`, size: 256 }
      ];

    const mimeTypes = (forgeConfig.packagerConfig?.protocols ?? []).flatMap((p) => p.schemes.map((s) => "x-scheme-handler/" + s.toLowerCase()));

    const metadata = {
      Name: appName,
      Exec: executable,
      Terminal: "false",
      Type: "Application",
      Icon: executable,
      StartupWMClass: appName.toLowerCase(),
      "X-AppImage-Version": packageJSON.version,
      Comment: packageJSON.description,
      Categories: "Utility",
      MimeType: mimeTypes.join(";")
    };

    let desktop = "[Desktop Entry]";
    for (const [key, value] of Object.entries(metadata)) desktop += `\n${key}=${value}`;
    desktop += "\n";

    if (!existsSync(makeDir)) mkdirSync(makeDir, { recursive: true });

    const stageDir = path.join(makeDir, `__appImage-${targetArch}`);
    await this.ensureDirectory(stageDir);

    let appRun = readFileSync(path.join(import.meta.dirname, '..', '..', 'AppRun'), 'utf8');
    appRun = appRun.replace(/{{\.ExecutableName}}/g, executable);
    const appRunPath = path.join(dir, 'AppRun');
    writeFileSync(appRunPath, appRun, { mode: 0o755 });

    const builderOptions = {
      appDir: dir,
      stageDir,
      arch: archFromString(targetArch),
      output: appPath,
      options: {
        productName: appName,
        productFilename: appName,
        executableName: executable,
        desktopEntry: desktop,
        icons,
        compression: this.config?.compression,
        fileAssociations: []
      }
    };

    if (this.config?.appimageToolVersion && this.config.compression === "xz") {
      throw new Error(`${this.name}: compression "xz" is only supported by the default FUSE2 runtime, not by the static runtime selected via appimageToolVersion. Use "gzip" or "zstd".`);
    }

    try {
      if (this.config?.appimageToolVersion) {
        await buildStaticRuntimeAppImage(this.config.appimageToolVersion, builderOptions);
      } else {
        await buildLegacyFuse2AppImage(builderOptions);
      }
    } finally {
      rmSync(appRunPath, { force: true });
      rmSync(stageDir, { recursive: true, force: true });
    }

    return [appPath];
  }
}
