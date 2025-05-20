import { useState, useEffect } from 'react';

interface Props {
  categoryId?: string;
}

export default function CategoryForm({ categoryId }: Props) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'Published',
  });

  useEffect(() => {
    if (categoryId) {
      const fetched = {
        name: 'Gadgets',
        description: 'Electronic devices',
        status: 'Published',
      };
      setForm(fetched);
    }
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(categoryId ? 'Update category' : 'Create category', form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded text-sm"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded text-sm"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded text-sm"
      >
        <option value="Published">Published</option>
        <option value="Unpublished">Unpublished</option>
      </select>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
      >
        {categoryId ? 'Update Category' : 'Create Category'}
      </button>
    </form>
  );
}
