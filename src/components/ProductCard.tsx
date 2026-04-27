import { Link } from "react-router-dom";
import { Star, Truck, BarChart3, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative p-4 bg-surface block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={200}
          height={160}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem] hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-success/10 text-success text-xs font-bold px-1.5 py-0.5 rounded">
            <Star className="h-3 w-3 fill-current" />
            {product.rating}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Specs */}
        <ul className="space-y-0.5 mb-3">
          {product.specs.map((s) => (
            <li key={s} className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mt-auto">
          <div className="mb-1">
            <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="ml-2 text-sm font-semibold text-success">{discount}% off</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-1">EMI from {product.emi}</p>
          <p className="text-xs text-success flex items-center gap-1 mb-4">
            <Truck className="h-3 w-3" />
            {product.delivery}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="cta" size="sm" className="flex-1">
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground hover:bg-muted">
              <BarChart3 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
