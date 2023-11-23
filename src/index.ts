import { User } from './models/User';

const user = new User({ name: 'newname', age: 0 });

console.log(user.get('name'));
user.on("change", () => {
  console.log("User changed");
})


user.trigger("change")
