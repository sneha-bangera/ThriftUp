import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  userEmail: String,
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
