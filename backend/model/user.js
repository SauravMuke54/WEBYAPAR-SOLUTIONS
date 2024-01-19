const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const Schema = mongoose.Schema; //creating schema class
//creation of userschema
const userSchema = new Schema(
{
    username: {
      type: String,
      trim: true,
      required: true,
      unique:true
    },
    encry_password: {
      type: String,

      trim: true,
    },
    salt: String,
    name:{
        type:String,
        trim:true,
        default:""
    },
    filename:{
      type:String,
      trim:true,
      default:""
  },
    role:{
        type:Number,
        default:0

    },
  
    photo_status:{
      type:Number,
    default:0    
  }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
