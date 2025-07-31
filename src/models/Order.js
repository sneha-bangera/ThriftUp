import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: String,
      image: String,
    }
  ],
  totalAmount: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
