import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

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
}
