import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

// Define the user schema
const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [15, 'Name cannot exceed 15 characters'],
            trim: true // Remove leading/trailing whitespace
        },
        lastName: {
            type: String,
            required: true,
            minlength: [2, "Name cannot exceed 2 characters"],
            maxlength: [15, 'Name cannot exceed 15 characters'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [1, 'Age must be at least 1'],
            max: [150, 'Age cannot exceed 150']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: [isEmail, 'Invalid email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
        },
        role: {
            type: String,
            default: 'user',
            choices: ['admin', 'manager', 'user']
        },
        avatar: {
            type: String,
            default: 'uploads/profile.png'
        }
    })
;

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
//{
//     "firstName":"Mohamed",
//     "lastName":"Al-Sirri",
//     "age":20,
//     "email":"mohamed.alsirr",
//     "password": 1234
// }