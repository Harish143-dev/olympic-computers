import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, Clock, Send } from "lucide-react";

const BulkEnquiry = () => {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. I need: ${form.requirement}. Contact: ${form.phone}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="bulk-enquiry" className="py-12 md:py-16 bg-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <div className="bg-primary p-8 md:p-10 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                Need Bulk Pricing?
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Get customized quotes for offices, schools, and large setups. GST billing available.
              </p>
              <div className="flex items-center gap-2 text-accent">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold">Response within 30 minutes</span>
              </div>
            </div>

            {/* Right - Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Requirement</label>
                <textarea
                  required
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="e.g., 10 CCTV cameras for office, projector setup for conference room"
                />
              </div>
              <Button variant="cta" size="lg" type="submit" className="mt-2">
                <Send className="h-4 w-4" />
                Get Quote via WhatsApp
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkEnquiry;
