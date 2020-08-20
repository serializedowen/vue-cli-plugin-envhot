import { watch } from "chokidar";
import { PluginAPI } from "@vue/cli-service";
import parseEnv from "./parseEnv";
import runtimeValueFactory from "./runtimeValueFactory";
/**
 * Latter file takes higher priority.
 */
const envFiles = [
  ".env",
  ".env.local",
  ".env.development",
  ".env.development.local",
];

module.exports = (api: PluginAPI) => {
  api.chainWebpack((config) => {
    config.plugins.get("define").tap(runtimeValueFactory);
  });

  api.configureDevServer((app, server) => {
    const watcher = watch(".env?(.development)?(.local)");

    watcher.on("change", () => {
      parseEnv(envFiles);
      server.invalidate(() => {});
      // server.
    });
  });
};
