type Callback = () => void;

// This class is responsible for handling events
export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    // const handlers = this.events[eventName] || [];
    // handlers.push(callback);
    // this.events[eventName] = handlers;

    this.events[eventName]
      ? this.events[eventName].push(callback)
      : (this.events[eventName] = [callback]);
  };

  trigger = (eventName: string) => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  };

  off = (eventName: string) => {
    delete this.events[eventName];
  };
}
