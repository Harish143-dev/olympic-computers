import { Home, Building2, Shield, Monitor, Clapperboard, Camera } from "lucide-react";
import type { Product } from "@/data/products";

const useCaseIcons: Record<string, { icon: typeof Home; label: string }> = {
  Home: { icon: Home, label: "Home Use" },
  Office: { icon: Building2, label: "Office / Business" },
  Security: { icon: Shield, label: "Security" },
  Entertainment: { icon: Clapperboard, label: "Entertainment" },
  Outdoor: { icon: Camera, label: "Outdoor" },
};

function getUseCases(product: Product): string[] {
  const cat = product.category;
  if (cat === "projectors") {
    if (product.usage === "Office") return ["Office", "Home"];
    if (product.usage === "Outdoor") return ["Outdoor", "Entertainment"];
    return ["Home", "Entertainment", "Office"];
  }
  if (cat === "cctv") return ["Security", "Home", "Office"];
  if (cat === "home-theater") return ["Home", "Entertainment"];
  if (cat === "screens") return ["Home", "Office"];
  if (cat === "tvs") return ["Home", "Entertainment"];
  return ["Home"];
}

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const useCases = getUseCases(product);

  return (
    <div className="space-y-8">
      {/* Description */}
      {product.description && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">About this product</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>
      )}

      {/* Key Highlights */}
      {product.highlights && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Key Highlights</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {product.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 bg-card rounded-lg border border-border p-3">
                <Monitor className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Use Cases */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Ideal For</h3>
        <div className="flex flex-wrap gap-3">
          {useCases.map((uc) => {
            const info = useCaseIcons[uc];
            if (!info) return null;
            const Icon = info.icon;
            return (
              <div
                key={uc}
                className="flex items-center gap-2.5 bg-surface border border-border rounded-xl px-4 py-3"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">{info.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Specs Table */}
      {product.fullSpecs && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
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
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
