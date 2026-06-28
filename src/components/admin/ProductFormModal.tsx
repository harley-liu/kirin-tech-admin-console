import { useState, type FormEvent } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { slugify } from '../../lib/slugify';
import type { Product, Category } from '../../lib/types';
import Modal from './Modal';

interface ProductFormModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductFormModal({ product, categories, onClose, onSaved }: ProductFormModalProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compare_at_price != null ? String(product.compare_at_price) : ''
  );
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.id ?? '');
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '');
  const [stockQuantity, setStockQuantity] = useState(
    product ? String(product.stock_quantity) : '0'
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    product?.specs ? Object.entries(product.specs).map(([key, value]) => ({ key, value })) : []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    setSpecs(prev => [...prev, { key: '', value: '' }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stockQuantity, 10);

    if (!name.trim() || !slug.trim()) {
      setError('Name and slug are required.');
      return;
    }
    if (!categoryId) {
      setError('Please choose a category.');
      return;
    }
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Enter a valid price.');
      return;
    }
    if (Number.isNaN(stockNum) || stockNum < 0) {
      setError('Enter a valid stock quantity (0 or more).');
      return;
    }

    const specsObject: Record<string, string> = {};
    specs.forEach(({ key, value }) => {
      if (key.trim()) specsObject[key.trim()] = value;
    });

    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      price: priceNum,
      compare_at_price: compareAtPrice.trim() ? parseFloat(compareAtPrice) : null,
      category_id: categoryId,
      image_url: imageUrl.trim() || null,
      stock_quantity: stockNum,
      in_stock: stockNum > 0,
      featured,
      specs: specsObject,
    };

    const result = product
      ? await supabase.from('products').update(payload).eq('id', product.id)
      : await supabase.from('products').insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }
    onSaved();
  };

  return (
    <Modal title={product ? 'Edit Product' : 'Add Product'} onClose={onClose} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={e => handleNameChange(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Logitech MX Master 3S"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={e => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="logitech-mx-master-3s"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description ?? ''}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Short product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="" disabled>Choose a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end pb-2.5">
            <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Featured product
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="149.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Compare-at Price ($) <span className="text-gray-400 font-normal">optional</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={compareAtPrice}
              onChange={e => setCompareAtPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="169.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
            <input
              type="number"
              step="1"
              min="0"
              value={stockQuantity}
              onChange={e => setStockQuantity(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="25"
            />
            <p className="text-xs text-gray-400 mt-1">
              "In Stock" on the store page is set automatically (quantity &gt; 0).
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Package className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <span className="ml-3 text-xs text-gray-400">Image preview</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Specifications</label>
            <button
              type="button"
              onClick={addSpec}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec
            </button>
          </div>
          {specs.length === 0 ? (
            <p className="text-xs text-gray-400">No specs added yet.</p>
          ) : (
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={e => updateSpec(i, 'key', e.target.value)}
                    placeholder="e.g. battery"
                    className="w-1/3 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={e => updateSpec(i, 'value', e.target.value)}
                    placeholder="e.g. 70 days"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    aria-label="Remove spec"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
