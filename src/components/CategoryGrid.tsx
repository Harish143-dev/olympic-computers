import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
        <p className="text-muted-foreground mb-8">Find exactly what you need</p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 block"
              >
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <img src={cat.image} alt={cat.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" width={96} height={96} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cat.count} Products</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
