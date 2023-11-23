 import { User } from "./models/User"; 

 const user = new User({name: "newname", age: 0})

 user.attributes.get("name")
 user.attributes.get("age")
 