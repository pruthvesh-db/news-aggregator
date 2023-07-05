const mongoose = require('mongoose');
Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name not provided'],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        trim: true,
        required: [true, "Email not provided"],
        validate: {
          validator: function (v) {
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
          },
          message: "Email provided is incorrect",
        },
      },
      password: {
        type: String,
        required: true,
      },
      created: {
        type: Date,
        default: Date.now,
      },
      preferences: {
        type: Array,
        default: [
          "stock market",
          "aviation",
          "election",
        ],
      },
    
})

module.exports = mongoose.model("User", userSchema);