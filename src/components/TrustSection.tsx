import { Shield, Truck, RotateCcw, Wrench, Receipt, Users } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: Shield, title: "Manufacturer Warranty", desc: "1–3 year warranty on all products" },
  { icon: Truck, title: "Fast Delivery", desc: "2–4 days across India" },
  { icon: Wrench, title: "Installation Support", desc: "Professional setup available" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: Receipt, title: "GST Billing", desc: "Proper invoicing for businesses" },
  { icon: Users, title: "500+ Businesses", desc: "Trusted by enterprises nationwide" },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-10">
          Why Choose Olympic Computers?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <item.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-primary-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-primary-foreground/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
