import eventEmitter from "./EventEmitter";
import { ADDED_KEY, DELETED_KEY } from "./events";

class Storage {
  private current: Object;
  private previous: Object;

  constructor() {
    this.current = {};
    this.previous = {};
  }

  /**
   *  push current value to previous and start patching process
   */
  push() {
    // if (!isInit) this.current = {};
    this.previous = Object.assign({}, this.current);
  }

  setValue(key: string, value: string) {
    this.current[key] = value;
  }

  getCurrent() {
    return this.current;
  }

  getValue(key: string) {
    return this.current[key];
  }

  private compareHelper(
    keys1: string[],
    keys2: string[],
    event
  ): { event: string; key: string }[] {
    return keys1
      .filter((key) => {
        if (keys2.indexOf(key) === -1) {
          eventEmitter.emit(event, key);
          return true;
        }
        return false;
      })
      .map((key) => ({ event, key }));
  }

  /**
   * Emit events and return list of keys added in .env files
   */
  compare() {
    const prevKeys = Object.keys(this.previous);
    const currKeys = Object.keys(this.current);

    return this.compareHelper(prevKeys, currKeys, DELETED_KEY).concat(
      this.compareHelper(currKeys, prevKeys, ADDED_KEY)
    );
  }
}

export default new Storage();
