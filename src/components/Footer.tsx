import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link
              to="/"
              className="inline-flex"
              aria-label="Home"
            >
              <img
                src="/imgi_1_logo.png"
                alt="Logo"
                className="h-20 w-auto object-contain sm:h-24"
              />
            </Link>
            <p className="text-sm text-primary-foreground/70">
              India's trusted source for projectors, CCTV cameras, home theater systems, and AV equipment. Premium products at cost-effective pricing.
            </p>
            <Button variant="whatsapp" size="sm">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`} className="transition-colors hover:text-accent">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="transition-colors hover:text-accent">Track Order</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Return Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Warranty Info</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Installation Support</a></li>
              <li><Link to="/#bulk-enquiry" className="transition-colors hover:text-accent">Bulk Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                sales@olympiccomputers.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-primary-foreground/50 sm:flex-row">
          <p>Copyright 2026. All rights reserved.</p>
          <p>GSTIN: 27XXXXX1234X1ZX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
