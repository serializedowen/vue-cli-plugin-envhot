export class EventEmitter {
  private listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function) {
    this.listeners;

    if (!this.listeners[event]) {
      this.listeners[event] = [callback];
    } else {
      this.listeners[event].push(callback);
    }
  }

  emit(event: string, ...params) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((func) => func(params));
    } else {
      console.log("unknown event");
    }
  }
}
export default new EventEmitter();
