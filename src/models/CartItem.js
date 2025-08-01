// models/CartItem.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'M',
  },
  category: {
    type: String,
    default: 'General',
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  userEmail: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
