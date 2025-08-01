"use client";
import React from "react";

const FakeRazorpayModal = ({ isOpen, onClose, totalAmount, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-deep-plum mb-4">Complete Payment</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Card Number (e.g., 1234 5678 9012 3456)"
          />
          <div className="flex gap-2">
            <input className="w-1/2 border p-2 rounded" placeholder="MM/YY" />
            <input className="w-1/2 border p-2 rounded" placeholder="CVV" />
          </div>
          <input
            className="w-full border p-2 rounded"
            placeholder="Name on Card"
          />
        </div>

        <button
          onClick={() => {
            onSuccess();
            onClose();
          }}
          className="bg-hot-pink text-white w-full py-2 mt-6 rounded hover:bg-deep-plum"
        >
          Pay ₹{totalAmount}
        </button>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:underline mt-3 block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FakeRazorpayModal;
