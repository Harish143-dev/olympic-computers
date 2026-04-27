import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Zap, MessageCircle, Building2,
  Shield, Truck, RotateCcw, Wrench, Star, ChevronRight,
  Minus, Plus, Heart, Share2, Check
} from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";
import ProductDescription from "@/components/ProductDescription";
import { Button } from "@/components/ui/button";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { getProductById, allProducts, getCategoryBySlug } from "@/data/products";

const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "delivery">("description");

  if (!product) {
    return (
      <div className="min-h-screen">
        <StickyHeader />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-accent hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWhatsApp = () => {
    const msg = `Hi, I'm interested in: ${product.name} (${formatPrice(product.price)}). Product link: ${window.location.href}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleBulkQuote = () => {
    const msg = `Hi, I need a bulk quote for: ${product.name}. Please share pricing for multiple units.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <StickyHeader />

      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-accent">{category.name}</Link>
              <ChevronRight className="h-3 w-3 flex-shrink-0" />
            </>
          )}
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProductGallery
              images={product.images && product.images.length > 0 ? product.images : [product.image]}
              name={product.name}
              badge={product.badge}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <p className="text-sm text-accent font-medium mb-1">{product.brand}</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-success/10 text-success text-sm font-bold px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-current" />
                {product.rating}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
              {product.inStock && (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="h-4 w-4" /> In Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="bg-surface rounded-xl p-4 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {discount > 0 && (
                  <span className="bg-success/10 text-success text-sm font-bold px-2 py-0.5 rounded">{discount}% off</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">EMI from <span className="font-semibold text-foreground">{product.emi}</span></p>
            </div>

            {/* Highlights */}
            {product.highlights && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Highlights</h3>
                <ul className="space-y-1.5">
                  {product.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs summary */}
            {!product.highlights && (
              <ul className="space-y-1.5 mb-4">
                {product.specs.map((s) => (
                  <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {/* Delivery */}
            <div className="flex items-center gap-2 text-sm text-success mb-6">
              <Truck className="h-4 w-4" />
              {product.delivery}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-foreground">Qty:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold text-foreground">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button variant="cta" size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="default" size="lg" className="w-full">
                <Zap className="h-5 w-5" />
                Buy Now
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button variant="outline" size="default" onClick={handleBulkQuote}>
                <Building2 className="h-4 w-4" />
                Get Bulk Quote
              </Button>
              <Button variant="whatsapp" size="default" onClick={handleWhatsApp}>
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Trust Block */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: product.warranty || "1 Year Warranty" },
                { icon: Truck, text: "Delivered in 2–4 days" },
                { icon: RotateCcw, text: "7-day easy return" },
                { icon: Wrench, text: "Installation available" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground bg-surface rounded-lg p-2.5">
                  <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs: Description, Specs, Reviews, Delivery */}
      <section className="bg-surface border-y border-border">
        <div className="container">
          <div className="flex gap-0 border-b border-border overflow-x-auto">
            {(["description", "specs", "reviews", "delivery"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "description" && "Description"}
                {tab === "specs" && "Specifications"}
                {tab === "reviews" && `Reviews (${product.reviews})`}
                {tab === "delivery" && "Delivery & Returns"}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ProductDescription product={product} />
              </motion.div>
            )}

            {activeTab === "specs" && product.fullSpecs && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.fullSpecs).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-card" : "bg-surface"}>
                          <td className="py-3 px-4 text-sm font-medium text-foreground w-1/3">{key}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "specs" && !product.fullSpecs && (
              <div className="text-muted-foreground text-sm">
                <ul className="space-y-2">
                  {product.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CustomerReviews rating={product.rating} reviewCount={product.reviews} />
              </motion.div>
            )}

            {activeTab === "delivery" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Delivery</h3>
                  <p className="text-sm text-muted-foreground">Standard delivery within 2–4 business days across India. Free delivery on orders above ₹9,999. Express delivery available in select cities.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Returns</h3>
                  <p className="text-sm text-muted-foreground">7-day easy return policy. Product must be in original packaging with all accessories. Refund processed within 5–7 business days after pickup.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Installation</h3>
                  <p className="text-sm text-muted-foreground">Professional installation available on request in 50+ cities. Contact us via WhatsApp for scheduling.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Warranty</h3>
                  <p className="text-sm text-muted-foreground">{product.warranty || "1 Year Manufacturer Warranty"}. Extended warranty options available at checkout.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;
