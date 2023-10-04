import storage from "./storage";
import eventEmitter from "./EventEmitter";
import { ADDED_KEY, DELETED_KEY } from "./events";

// const webpack = require("../ss/node_modules/webpack");
const webpack = require("webpack");

let initialized = false;

export default function runtimeValueFactory(args, ...rest) {
  const prop = "process.env";
  const arg = Object.assign({}, args[0]);

  Object.keys(arg[prop]).forEach((key) => {
    if (!initialized) {
      console.log(arg[prop][key]);
      storage.setValue(key, arg[prop][key]);
    }

    arg[prop][key] = webpack.DefinePlugin.runtimeValue(() => {
      return JSON.stringify(storage.getValue(key));
    }, true);
  });

  eventEmitter.on(ADDED_KEY, (key) => {
    arg[prop][key] = webpack.DefinePlugin.runtimeValue(() => {
      return JSON.stringify(storage.getValue(key));
    }, true);
  });

  eventEmitter.on(DELETED_KEY, (key) => {
    delete arg[prop][key];

    console.log(key);
  });

  if (!initialized) {
    initialized = true;
    storage.push();
  }

  initialized = true;
  //
  return [arg];
}
