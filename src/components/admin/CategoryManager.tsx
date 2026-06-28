import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Category } from '../../lib/types';
import CategoryFormModal from './CategoryFormModal';

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error: catError } = await supabase.from('categories').select('*').order('name');
    if (catError) {
      setError(catError.message);
      setLoading(false);
      return;
    }
    setCategories(data ?? []);

    const { data: productRows } = await supabase.from('products').select('category_id');
    const tally: Record<string, number> = {};
    (productRows ?? []).forEach(p => {
      if (p.category_id) tally[p.category_id] = (tally[p.category_id] ?? 0) + 1;
    });
    setCounts(tally);
    setLoading(false);
  };

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (category: Category) => {
    const productCount = counts[category.id] ?? 0;
    const confirmMsg = productCount > 0
      ? `Delete "${category.name}"? ${productCount} product${productCount === 1 ? '' : 's'} will become uncategorized.`
      : `Delete "${category.name}"?`;
    if (!window.confirm(confirmMsg)) return;

    setDeletingId(category.id);
    const { error: delError } = await supabase.from('categories').delete().eq('id', category.id);
    setDeletingId(null);
    if (delError) {
      alert(`Could not delete category: ${delError.message}`);
      return;
    }
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {loading ? 'Loading...' : `${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}`}
        </p>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Category
        </button>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 card">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No categories yet. Add your first one.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Products</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50/60">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900">{cat.name}</p>
                    {cat.description && (
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{cat.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{cat.slug}</td>
                  <td className="px-5 py-3.5 text-gray-600">{counts[cat.id] ?? 0}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditing(cat); setShowForm(true); }}
                        className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        aria-label={`Edit ${cat.name}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        disabled={deletingId === cat.id}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        aria-label={`Delete ${cat.name}`}
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
        <CategoryFormModal
          category={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}
