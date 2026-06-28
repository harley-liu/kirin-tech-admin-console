import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart, X, ChevronDown, Search, Package, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';
import type { Product, Category } from '../lib/types';

export default function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*, categories(*)').order('name'),
      ]);
      if (catRes.data) {
        setCategories(catRes.data);
        // If page loaded with a category slug in the URL, resolve it to an id
        const slugFromUrl = searchParams.get('category');
        if (slugFromUrl) {
          const match = catRes.data.find((c: Category) => c.slug === slugFromUrl);
          if (match) setActiveCategory(match.id);
        }
      }
      if (prodRes.data) setProducts(prodRes.data as Product[]);
      setLoading(false);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync activeCategory with URL params when they change (e.g., from footer links)
  useEffect(() => {
    const slugFromUrl = searchParams.get('category');
    if (slugFromUrl) {
      const match = categories.find(c => c.slug === slugFromUrl);
      if (match && match.id !== activeCategory) {
        setActiveCategory(match.id);
      }
    } else if (activeCategory !== 'all') {
      setActiveCategory('all');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category_id === activeCategory)
    .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const activeCatName = categories.find(c => c.id === activeCategory)?.name || 'All Products';

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">Online Store</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Computer Peripherals & IP Phones</h1>
            <p className="text-lg text-gray-300">
              Quality hardware for your business. From keyboards and monitors to enterprise IP phones.
            </p>
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={activeCategory}
                onChange={e => {
                  setActiveCategory(e.target.value);
                  if (e.target.value === 'all') {
                    setSearchParams({});
                  } else {
                    const cat = categories.find(c => c.id === e.target.value);
                    if (cat) setSearchParams({ category: cat.slug });
                  }
                }}
                className="w-full sm:w-56 px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full sm:w-48 px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
              >
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => { setActiveCategory('all'); setSearchParams({}); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              All Products
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  setSearchParams({ category: c.slug });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} in ${activeCatName}`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(product => {
                const catName = product.categories?.name || categories.find(c => c.id === product.category_id)?.name || '';
                return (
                  <div key={product.id} className="card group">
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package className="w-16 h-16" />
                        </div>
                      )}
                      {product.featured && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                      )}
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {catName && <p className="text-xs text-gray-400 mb-1">{catName}</p>}
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                        {product.compare_at_price && (
                          <span className="text-sm text-gray-400 line-through">${product.compare_at_price.toFixed(2)}</span>
                        )}
                      </div>
                      {product.in_stock ? (
                        <button
                          onClick={() => handleAdd(product)}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            addedId === product.id
                              ? 'bg-accent-500 text-white'
                              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                          }`}
                        >
                          {addedId === product.id ? (
                            <>Added!</>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" /> Add to Cart
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
