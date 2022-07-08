import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { registerSchema } from "swaggiffy";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
    unique: true
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  nationalId: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 16
  },
  role: {
    default: "Standard",
    type: String,
    enum: ["Standard", "Admin"]
  }
});

userSchema.methods.generateAuthToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      nationalId: this.nationalId,
      role: this.role
    },
    process.env.TOKEN_SECRET
  );
};
registerSchema("User", userSchema, { orm: "mongoose" });
const User = mongoose.model("User", userSchema);

export default User;
