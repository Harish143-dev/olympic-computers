import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import {
  getProductsByCategory,
  getCategoryBySlug,
  filtersByCategory,
  type FilterConfig,
  type Product,
} from "@/data/products";

type SortOption = "relevance" | "price-low" | "price-high" | "rating" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
  { value: "newest", label: "Latest" },
];

const priceRanges = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const allCategoryProducts = getProductsByCategory(slug || "");
  const filters = filtersByCategory[slug || ""] || [];

  const [sort, setSort] = useState<SortOption>("relevance");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = { price: true };
    filters.forEach((f) => (init[f.key] = true));
    return init;
  });

  const toggleFilter = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = Object.values(activeFilters).some((v) => v.length > 0) || selectedPriceRange !== null;

  const filteredProducts = useMemo(() => {
    let products = [...allCategoryProducts];

    // Price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      products = products.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Dynamic filters
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length === 0) return;
      products = products.filter((p) => {
        const val = (p as any)[key];
        if (typeof val === "boolean") return values.includes("Yes") ? val : true;
        if (typeof val === "number") {
          // Handle lumens ranges
          if (key === "lumens") {
            return values.some((v) => {
              if (v === "Under 1000") return val < 1000;
              if (v === "1000–3000") return val >= 1000 && val <= 3000;
              if (v === "3000–5000") return val >= 3000 && val <= 5000;
              if (v === "5000+") return val >= 5000;
              return false;
            });
          }
          return true;
        }
        return values.includes(String(val));
      });
    });

    // Sort
    switch (sort) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return products;
  }, [allCategoryProducts, sort, activeFilters, selectedPriceRange]);

  const toggleFilterSection = (key: string) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!category) {
    return (
      <div className="min-h-screen">
        <StickyHeader />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/" className="text-accent hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price filter */}
      <div>
        <button
          onClick={() => toggleFilterSection("price")}
          className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3"
        >
          Price
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.price ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.price && (
          <div className="space-y-2">
            {priceRanges.map((range, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange === i}
                  onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-muted-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic filters */}
      {filters.map((filter) => (
        <div key={filter.key}>
          <button
            onClick={() => toggleFilterSection(filter.key)}
            className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3"
          >
            {filter.label}
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters[filter.key] ? "rotate-180" : ""}`} />
          </button>
          {expandedFilters[filter.key] && (
            <div className="space-y-2">
              {filter.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(activeFilters[filter.key] || []).includes(opt)}
                    onChange={() => toggleFilter(filter.key, opt)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-muted-foreground">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-accent w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <StickyHeader />

      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{category.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products found</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-9 pl-3 pr-8 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-40 bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPriceRange !== null && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-3 py-1.5 rounded-full">
                    {priceRanges[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(null)}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {Object.entries(activeFilters).map(([key, values]) =>
                  values.map((v) => (
                    <span key={`${key}-${v}`} className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-3 py-1.5 rounded-full">
                      {v}
                      <button onClick={() => toggleFilter(key, v)}><X className="h-3 w-3" /></button>
                    </span>
                  ))
                )}
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-accent">
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No products match your filters</p>
                <Button variant="cta" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card shadow-2xl animate-slide-in overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
