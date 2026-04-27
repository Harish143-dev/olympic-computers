import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import UseCaseNav from "@/components/UseCaseNav";
import BundleOffers from "@/components/BundleOffers";
import TrustSection from "@/components/TrustSection";
import BulkEnquiry from "@/components/BulkEnquiry";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <UseCaseNav />
      <BundleOffers />
      <TrustSection />
      <BulkEnquiry />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
