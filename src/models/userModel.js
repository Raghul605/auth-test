const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique : true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: false,
    },
    },
    {
    timestamps: true,
    }
)

const userdata = mongoose.model("User", userSchema);

module.exports = userdata