import { User } from './models/User';

const user = new User({id: 1, name: "Mossy", age: 20});
 user.on("save", () => {console.log("User has been saved");})
user.save()
  
 