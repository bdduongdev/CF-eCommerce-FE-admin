import { useState } from 'react';

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    discount: '',
    description: '',
    status: 'Published',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4 w-full">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2 text-sm"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded p-2 text-sm"
      />
      <div className="flex gap-2">
        <input
          type="number"
          name="price"
          placeholder="Unit Price"
          value={form.price}
          onChange={handleChange}
          className="flex-1 border rounded p-2 text-sm"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
          className="flex-1 border rounded p-2 text-sm"
        />
      </div>
      <input
        type="number"
        name="stock"
        placeholder="In-Stock Quantity"
        value={form.stock}
        onChange={handleChange}
        className="w-full border rounded p-2 text-sm"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded p-2 text-sm"
      >
        <option value="Published">Published</option>
        <option value="Unpublished">Unpublished</option>
      </select>
      <textarea
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded p-2 text-sm"
        rows={4}
      />
    </form>
  );
}
