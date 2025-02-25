import mongoose from 'mongoose';

// Define the user schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minlength: [3, 'title must be at least 3 characters long'],
        maxlength: [20, 'title cannot exceed 20 characters'],
        trim: true // Remove leading/trailing whitespace
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [3, 'description must be at least 1'],
        maxlength: [301, 'description cannot exceed 300 characters']
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [1, 'price must be at least 1'],
    }
});

// Create the User model
const Product = mongoose.model('Product', productSchema);

// Export the User model
export default Product;