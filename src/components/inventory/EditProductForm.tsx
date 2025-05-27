import { useState, useEffect } from 'react';

type Product = {
  name: string;
  category: string;
  price: string;
  stock: string;
  discount: string;
  description: string;
  status: string;
};

type Props = {
  initialData?: Product;
  onSubmit?: (data: Product) => void;
};

export default function EditProductForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Product>({
    name: '',
    category: '',
    price: '',
    stock: '',
    discount: '',
    description: '',
    status: 'Published',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    alert('Product updated successfully!');
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm block mb-1 font-medium">Unit Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm block mb-1 font-medium">Discount</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
        </select>
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
