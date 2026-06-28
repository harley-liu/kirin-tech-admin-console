import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Package, Search, Star, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../lib/types';
import ProductFormModal from './ProductFormModal';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const [catRes, prodRes] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('products').select('*, categories(*)').order('name'),
    ]);
    if (catRes.error || prodRes.error) {
      setError(catRes.error?.message || prodRes.error?.message || 'Failed to load data.');
      setLoading(false);
      return;
    }
    setCategories(catRes.data ?? []);
    setProducts((prodRes.data as Product[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    const { error: delError } = await supabase.from('products').delete().eq('id', product.id);
    setDeletingId(null);
    if (delError) {
      alert(`Could not delete product: ${delError.message}`);
      return;
    }
    load();
  };

  const filtered = products
    .filter(p => categoryFilter === 'all' || p.category_id === categoryFilter)
    .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full sm:w-56 px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          disabled={categories.length === 0}
          className="btn-primary text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Product
        </button>
      </div>

      {categories.length === 0 && !loading && (
        <div className="px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-700 mb-6">
          Add a category first before creating products.
        </div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4">
        {loading ? 'Loading...' : `${filtered.length} product${filtered.length === 1 ? '' : 's'}`}
      </p>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 card">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No products found.</p>
        </div>
      ) : (
        <div className="card overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 flex items-center gap-1.5 truncate">
                          {product.name}
                          {product.featured && <Star className="w-3.5 h-3.5 text-primary-500 fill-current shrink-0" />}
                        </p>
                        <p className="text-xs text-gray-400 font-mono truncate">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {product.categories?.name || categories.find(c => c.id === product.category_id)?.name || '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.compare_at_price && (
                      <span className="ml-1.5 text-xs text-gray-400 line-through">
                        ${product.compare_at_price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.stock_quantity === 0
                          ? 'bg-red-50 text-red-600'
                          : product.stock_quantity <= 5
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-accent-50 text-accent-700'
                      }`}
                    >
                      {product.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditing(product); setShowForm(true); }}
                        className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProductFormModal
          product={editing}
          categories={categories}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}
