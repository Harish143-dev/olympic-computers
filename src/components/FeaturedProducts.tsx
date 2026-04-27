import { featuredProducts } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked deals with best prices</p>
          </div>
          <a href="#" className="text-sm font-semibold text-accent hover:underline hidden sm:inline">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
