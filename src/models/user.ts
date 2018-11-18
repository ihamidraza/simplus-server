import { Schema, model } from 'mongoose';

var userSchema = new Schema({
    name: String,
    email: String,
    token: String
 });

 const User = model('User', userSchema);

 export default User;