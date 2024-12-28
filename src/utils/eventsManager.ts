type THandler = (params: any) => void;

interface EventsMap {
  [name: string]: THandler[];
}

export interface IEventManager {
  addEvent: (name: string, handler: THandler) => this;
  removeEvent: (name: string, handler: THandler) => this;
  fireEvent: (name: string, params: any) => void;
}

export class EventManager implements IEventManager {
  private readonly eventsMap: EventsMap = {};

  constructor() {}

  public readonly addEvent = (name: string, handler: THandler) => {
    if (this.eventsMap[name]) {
      this.eventsMap[name].push(handler);
    } else {
      this.eventsMap[name] = [handler];
    }

    return this;
  };

  public readonly removeEvent = (name: string, handler: THandler) => {
    if (this.eventsMap[name]) {
      this.eventsMap[name] = this.eventsMap[name].filter(
        (oneOfHandlers) => oneOfHandlers !== handler
      );
    }

    return this;
  };

  public readonly fireEvent = (name: string, params: any) => {
    if (this.eventsMap[name]) {
      this.eventsMap[name].forEach((handler) => handler(params));
    }
  };
}
