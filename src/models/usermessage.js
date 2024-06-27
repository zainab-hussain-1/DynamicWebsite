const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email Id");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        validate(value) {
            if (value.toString().length !== 10) {
                throw new Error("Phone number must be 10 digits");
            }
        }
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
    },
});

// Collection
const User = mongoose.model("User", userSchema);
module.exports = User;
