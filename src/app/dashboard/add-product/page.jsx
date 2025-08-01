'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const AddProduct = () => {

  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    category: '',
    image: null,
  });
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState(null);

  const categories = ['Dresses', 'Tops', 'Bottoms', 'Footwear', 'Bags'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

   if (!session) {
    alert("You must be signed in to submit a product.");
    return;
  }

  if (!formData.image) {
    alert("Please select an image.");
    return;
  }

  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("price", formData.price);
  payload.append("image", formData.image);
  payload.append("category", formData.category);
  payload.append("description", formData.description);
  payload.append("size", formData.size);
  payload.append("userEmail", session?.user?.email || 'test@example.com'); // Ensure you have session access

  try {
    const res = await fetch("/api/products", {
      method: "POST",
      body: payload,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product submitted successfully!");
      router.push("/dashboard"); // Optional redirect
    } else {
      console.error(data.error || "Something went wrong.");
      alert("Product submission failed.");
    }
  } catch (err) {
  console.error("Submit error:", err?.message || err); // log more detail
  alert("Error submitting product.");
}
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Size (e.g. S, M, L)"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          required
        />

        {previewUrl && <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover rounded" />}

        <button
          type="submit"
          className="bg-hot-pink hover:bg-peach-pink text-white font-bold py-2 px-4 rounded"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
