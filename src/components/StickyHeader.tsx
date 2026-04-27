import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

const StickyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      {/* Top bar */}
      <div className="bg-primary/95 border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-1.5 text-xs text-primary-foreground/80">
          <div className="flex items-center gap-4">
            <span>GST Billing Available</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Trusted by 500+ Businesses</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center gap-4 py-3">
        <button className="lg:hidden text-primary-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link
          to="/"
          className="flex flex-shrink-0 items-center"
        >
          <img
            src="/imgi_1_logo.png"
            alt="Olympic Computers logo"
            className="h-14 w-auto object-contain sm:h-16 lg:h-20"
          />
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projectors, CCTV, home theater..."
              className="w-full h-10 pl-4 pr-12 rounded-lg bg-primary-foreground text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-accent rounded-r-lg text-accent-foreground hover:bg-accent/90 transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="whatsapp" size="sm" className="hidden lg:inline-flex">
            <Phone className="h-4 w-4" />
            Talk to Expert
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden lg:block bg-primary/80 border-t border-primary-foreground/10">
        <div className="container flex items-center gap-1 py-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="px-4 py-2 text-sm text-primary-foreground/90 hover:text-accent hover:bg-primary-foreground/5 rounded-md transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/#bulk-enquiry" className="px-4 py-2 text-sm font-semibold text-accent hover:bg-primary-foreground/5 rounded-md transition-colors">
            Bulk Orders
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 animate-slide-in">
          <div className="p-4 md:hidden">
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-10 pl-4 pr-12 rounded-lg bg-primary-foreground text-foreground text-sm placeholder:text-muted-foreground"
              />
              <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-accent rounded-r-lg text-accent-foreground">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col pb-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="px-6 py-3 text-sm text-primary-foreground/90 hover:text-accent hover:bg-primary-foreground/5"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/#bulk-enquiry" className="px-6 py-3 text-sm font-semibold text-accent" onClick={() => setMenuOpen(false)}>
              Bulk Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default StickyHeader;
