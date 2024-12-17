import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// we create a Schema for the user account
const userSchema = new Schema({
  nickName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model('Users', userSchema);
