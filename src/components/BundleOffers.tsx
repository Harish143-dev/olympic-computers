import { bundles } from "@/data/products";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Package, Tag } from "lucide-react";

const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

const BundleOffers = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center gap-3 mb-2">
          <Package className="h-7 w-7 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Bundle Offers</h2>
        </div>
        <p className="text-muted-foreground mb-8">Save more when you buy together</p>

        <div className="grid md:grid-cols-3 gap-6">
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border-2 border-accent/20 overflow-hidden hover:shadow-xl hover:border-accent/40 transition-all duration-300"
            >
              <div className="bg-accent/5 p-6 text-center">
                <img src={bundle.image} alt={bundle.name} className="h-24 mx-auto object-contain mb-3" loading="lazy" width={120} height={96} />
                <h3 className="font-bold text-foreground">{bundle.name}</h3>
              </div>

              <div className="p-5">
                <ul className="space-y-1.5 mb-4">
                  {bundle.products.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-foreground">{formatPrice(bundle.bundlePrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(bundle.originalPrice)}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-4">
                  <Tag className="h-3.5 w-3.5 text-success" />
                  <span className="text-sm font-semibold text-success">Save {formatPrice(bundle.savings)}</span>
                </div>

                <Button variant="cta" className="w-full">Get This Bundle</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundleOffers;
