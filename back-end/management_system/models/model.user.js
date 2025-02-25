import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "should enter first name"],
        minlength: [2, "first name must be at least 2 characters long"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "should enter last name"],
        minlength: [2, "last name must be at least 2 characters long"],
        trim: true
    },
    gender: {
        type: String,
        required: [true, "should select gender"],
        choices: ["male", "female", "other"]
    },
    email: {
        type: String,
        required: [true, "should enter email"],
        unique: true,
        validate: [isEmail, "Invalid email format"]
    },
    avatar: {
        type: String,
        default: "uploads/avatars/profile.png"
    },
    phone:{
        type: String,
        required: [true, "should enter phone number"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\+?\d{1,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    password: {
        type: String,
        required: [true, "should enter password"],
        minlength: [8, "password must be at least 8 characters long"],
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },


})

const User = mongoose.model("User", UserSchema)

export default User