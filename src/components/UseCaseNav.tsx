import { Film, Building2, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Film: <Film className="h-8 w-8" />,
  Building2: <Building2 className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
};

const useCases = [
  {
    title: "Home Theater Setup",
    description: "Projector + Screen + Sound system bundles curated for cinematic experiences at home.",
    icon: "Film",
    products: "12 curated bundles",
  },
  {
    title: "Office / Conference Room",
    description: "Professional AV setups for meetings, presentations, and video conferencing.",
    icon: "Building2",
    products: "8 curated bundles",
  },
  {
    title: "Classroom / Training",
    description: "Reliable, budget-friendly projector and audio solutions for education.",
    icon: "GraduationCap",
    products: "6 curated bundles",
  },
];

const UseCaseNav = () => {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Shop by Use Case</h2>
        <p className="text-muted-foreground mb-8">Find the perfect setup for your space</p>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.a
              key={uc.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                {iconMap[uc.icon]}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{uc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{uc.products}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseNav;
