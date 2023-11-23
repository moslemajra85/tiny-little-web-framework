import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';
// the purpose of this interface to describe the type of user Data
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(
    'http://localhost:3000/users'
  );
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    // return a reference to the on method from Eventing calss
    return this.events.on;
  }

  get trigger() {
    // return a reference to the trigger method from Eventing calss
    return this.events.tigger;
  }

  get get() {
    // return a reference to the get method from Attributes calss
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);

    // trigger a change event
    this.events.tigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((err) => {
        this.trigger(err);
      });
  }
}
