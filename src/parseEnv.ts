import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";
import storage from "./storage";

export default (files: Array<string>) => {
  const oldLength = Reflect.ownKeys(process.env).length;

  storage.push();

  files
    .map((file) => resolve(file))
    .map((file) => {
      if (existsSync(file)) {
        const { error, parsed } = config({ path: file });
        if (error) throw new Error(`error parsing ${file}: ${error}`);
        Object.entries(parsed).forEach(([k, v]) => storage.setValue(k, v));
      }
    });

  Object.entries(storage.getCurrent).forEach(
    ([key, val]) => (process.env[key] = val as string)
  );

  storage.compare();

  return Reflect.ownKeys(process.env).length !== oldLength;
};
