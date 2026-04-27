import catProjector from "@/assets/cat-projector.png";
import catCctv from "@/assets/cat-cctv.png";
import catHometheater from "@/assets/cat-hometheater.png";
import catScreen from "@/assets/cat-screen.png";
import catTv from "@/assets/cat-tv.png";
import prodMiniProjector from "@/assets/prod-mini-projector.png";
import prodBulletCam from "@/assets/prod-bullet-cam.png";
import prodSoundbar from "@/assets/prod-soundbar.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  specs: string[];
  emi: string;
  delivery: string;
  badge?: string;
  rating: number;
  reviews: number;
  brand: string;
  inStock: boolean;
  // Detailed fields for PDP
  description?: string;
  fullSpecs?: Record<string, string>;
  warranty?: string;
  highlights?: string[];
  // Filter-specific fields
  lumens?: number;
  resolution?: string;
  throwDistance?: string;
  usage?: string;
  cameraType?: string;
  nightVision?: boolean;
  storageType?: string;
  channels?: string;
  powerOutput?: string;
  connectivity?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface Bundle {
  id: string;
  name: string;
  products: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  image: string;
}

export const categories: Category[] = [
  { id: "projectors", slug: "projectors", name: "Projectors", image: catProjector, count: 42 },
  { id: "cctv", slug: "cctv", name: "CCTV Cameras", image: catCctv, count: 67 },
  { id: "home-theater", slug: "home-theater", name: "Home Theater", image: catHometheater, count: 28 },
  { id: "screens", slug: "screens", name: "Projector Screens", image: catScreen, count: 35 },
  { id: "tvs", slug: "tvs", name: "TVs", image: catTv, count: 22 },
];

export const allProducts: Product[] = [
  // PROJECTORS
  {
    id: "proj-001",
    name: "Epson EH-TW7100 4K PRO-UHD Projector",
    category: "projectors",
    price: 149990,
    originalPrice: 179990,
    image: catProjector,
    images: [catProjector, prodMiniProjector, catScreen, catHometheater],
    specs: ["4K PRO-UHD", "3000 Lumens", "HDR10 Support"],
    emi: "₹4,999/mo",
    delivery: "Delivered in 2–3 days",
    badge: "Best Seller",
    rating: 4.7,
    reviews: 234,
    brand: "Epson",
    inStock: true,
    lumens: 3000,
    resolution: "4K",
    throwDistance: "Standard",
    usage: "Home",
    description: "Experience cinema-quality visuals at home with the Epson EH-TW7100. Featuring 4K PRO-UHD technology, 3000 lumens brightness, and HDR10 support for stunningly vivid imagery.",
    highlights: ["4K PRO-UHD resolution for razor-sharp detail", "3000 lumens — bright even in ambient light", "HDR10 + HLG for vivid colors", "Lens shift & keystone correction", "10W built-in speaker"],
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "4K PRO-UHD (3840 × 2160)",
      "Brightness": "3000 Lumens",
      "Contrast Ratio": "100,000:1",
      "Lamp Life": "5000 hours (Normal), 7500 hours (Eco)",
      "Throw Ratio": "1.32–2.15:1",
      "Lens Shift": "Vertical ±60%, Horizontal ±24%",
      "Keystone": "Auto Vertical ±30°",
      "Inputs": "2× HDMI 2.0, USB-A, USB-B",
      "Speaker": "10W Built-in",
      "Noise Level": "28 dB (Eco)",
      "Weight": "6.9 kg",
      "Dimensions": "410 × 310 × 157 mm",
    },
  },
  {
    id: "proj-002",
    name: "BenQ TK860i 4K HDR Smart Projector",
    category: "projectors",
    price: 189990,
    originalPrice: 219990,
    image: catProjector,
    specs: ["4K UHD", "3300 Lumens", "Android TV Built-in"],
    emi: "₹6,333/mo",
    delivery: "Delivered in 2–3 days",
    rating: 4.9,
    reviews: 156,
    brand: "BenQ",
    inStock: true,
    lumens: 3300,
    resolution: "4K",
    throwDistance: "Standard",
    usage: "Home",
    description: "The BenQ TK860i combines stunning 4K HDR visuals with Android TV for an all-in-one entertainment experience. Stream your favorite content directly without any external device.",
    highlights: ["Native 4K UHD resolution", "Android TV built-in for streaming", "3300 lumens for bright rooms", "HDR-PRO technology", "Smart auto-focus and keystone"],
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "4K UHD (3840 × 2160)",
      "Brightness": "3300 Lumens",
      "Contrast Ratio": "50,000:1",
      "Lamp Life": "4000 hours (Normal), 15000 hours (LampSave)",
      "Throw Ratio": "1.15–1.5:1",
      "Inputs": "2× HDMI 2.0b, USB-C, USB-A",
      "Smart Features": "Android TV, Google Assistant, Chromecast",
      "Speaker": "5W × 2 (Chamber speakers)",
      "HDR": "HDR10 / HLG",
      "Weight": "4.2 kg",
    },
  },
  {
    id: "proj-003",
    name: "Optoma HD146X Full HD Home Projector",
    category: "projectors",
    price: 62990,
    originalPrice: 74990,
    image: prodMiniProjector,
    specs: ["Full HD 1080p", "3600 Lumens", "Home Entertainment"],
    emi: "₹2,099/mo",
    delivery: "Delivered in 2–4 days",
    badge: "Value Pick",
    rating: 4.5,
    reviews: 412,
    brand: "Optoma",
    inStock: true,
    lumens: 3600,
    resolution: "Full HD",
    throwDistance: "Standard",
    usage: "Home",
    description: "Affordable Full HD projection with vibrant colors and 3600 lumens brightness. Perfect for movie nights and gaming.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "1920 × 1080 (Full HD)",
      "Brightness": "3600 Lumens",
      "Contrast Ratio": "25,000:1",
      "Lamp Life": "4000 hours (Normal), 15000 hours (Dynamic)",
      "Inputs": "2× HDMI, USB-A, 3.5mm Audio",
      "Speaker": "5W Built-in",
      "Weight": "2.8 kg",
    },
  },
  {
    id: "proj-004",
    name: "Epson EB-L210W Laser Business Projector",
    category: "projectors",
    price: 89990,
    originalPrice: 99990,
    image: catProjector,
    specs: ["WXGA", "4500 Lumens", "Laser Light Source"],
    emi: "₹2,999/mo",
    delivery: "Delivered in 2–4 days",
    rating: 4.4,
    reviews: 87,
    brand: "Epson",
    inStock: true,
    lumens: 4500,
    resolution: "HD",
    throwDistance: "Standard",
    usage: "Office",
    description: "Laser business projector with 4500 lumens for bright conference rooms. Virtually maintenance-free with 20,000-hour laser light source.",
    warranty: "3 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "1280 × 800 (WXGA)",
      "Brightness": "4500 Lumens",
      "Light Source": "Laser (20,000 hours)",
      "Inputs": "2× HDMI, VGA, USB-A, USB-B",
      "Wireless": "Optional Adapter",
      "Weight": "5.3 kg",
    },
  },
  {
    id: "proj-005",
    name: "ViewSonic PX748-4K Short Throw Projector",
    category: "projectors",
    price: 109990,
    originalPrice: 129990,
    image: prodMiniProjector,
    specs: ["4K UHD", "4000 Lumens", "Short Throw"],
    emi: "₹3,666/mo",
    delivery: "Delivered in 3–5 days",
    rating: 4.6,
    reviews: 63,
    brand: "ViewSonic",
    inStock: true,
    lumens: 4000,
    resolution: "4K",
    throwDistance: "Short Throw",
    usage: "Office",
    description: "Short throw 4K projector ideal for small conference rooms. Project 100\" from just 3.3 feet away.",
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "3840 × 2160 (4K UHD)",
      "Brightness": "4000 Lumens",
      "Throw Ratio": "0.8:1",
      "Inputs": "2× HDMI, USB-C, USB-A",
      "Weight": "4.0 kg",
    },
  },
  {
    id: "proj-006",
    name: "XGIMI Halo+ Portable Projector",
    category: "projectors",
    price: 84990,
    image: prodMiniProjector,
    specs: ["Full HD 1080p", "900 Lumens", "Android TV, Portable"],
    emi: "₹2,833/mo",
    delivery: "Delivered in 2–3 days",
    badge: "New Arrival",
    rating: 4.3,
    reviews: 198,
    brand: "XGIMI",
    inStock: true,
    lumens: 900,
    resolution: "Full HD",
    throwDistance: "Standard",
    usage: "Outdoor",
    description: "Ultra-portable Full HD projector with built-in battery and Android TV. Perfect for outdoor movie nights and travel.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "1920 × 1080 (Full HD)",
      "Brightness": "900 ANSI Lumens",
      "Battery": "2.5 hours",
      "Smart Features": "Android TV 10, Google Assistant",
      "Speaker": "Harman Kardon 5W × 2",
      "Weight": "1.6 kg",
    },
  },
  // CCTV CAMERAS
  {
    id: "cctv-001",
    name: "Hikvision 8-Channel 2MP HD CCTV Kit",
    category: "cctv",
    price: 24990,
    originalPrice: 32990,
    image: catCctv,
    specs: ["8 Cameras", "2MP Full HD", "Night Vision 30m"],
    emi: "₹2,499/mo",
    delivery: "Delivered in 2–4 days",
    badge: "Top Rated",
    rating: 4.8,
    reviews: 512,
    brand: "Hikvision",
    inStock: true,
    cameraType: "Dome",
    resolution: "Full HD",
    nightVision: true,
    storageType: "HDD",
    description: "Complete 8-camera surveillance kit with 2MP Full HD dome cameras, 1TB HDD DVR, and 30m night vision. Ideal for offices and homes.",
    highlights: ["8× 2MP dome cameras", "8-channel DVR with 1TB HDD", "30m infrared night vision", "IP67 weatherproof", "Free mobile app monitoring"],
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Cameras": "8 × 2MP (1920 × 1080)",
      "DVR": "8-Channel, H.265+ compression",
      "Storage": "1TB HDD (expandable to 6TB)",
      "Night Vision": "30m IR range",
      "Weather Rating": "IP67",
      "Mobile App": "Hik-Connect (iOS / Android)",
      "Power": "12V DC, included adapters",
      "Cable": "18m BNC cables included",
    },
  },
  {
    id: "cctv-002",
    name: "CP Plus 4-Channel 5MP Ultra HD Kit",
    category: "cctv",
    price: 19990,
    originalPrice: 25990,
    image: prodBulletCam,
    specs: ["4 Cameras", "5MP Ultra HD", "40m IR Range"],
    emi: "₹1,999/mo",
    delivery: "Delivered in 2–4 days",
    badge: "Value Pick",
    rating: 4.4,
    reviews: 342,
    brand: "CP Plus",
    inStock: true,
    cameraType: "Bullet",
    resolution: "5MP",
    nightVision: true,
    storageType: "HDD",
    description: "4-camera 5MP Ultra HD surveillance kit with bullet cameras and extended 40m night vision range.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Cameras": "4 × 5MP (2592 × 1944)",
      "DVR": "4-Channel, H.265",
      "Storage": "1TB HDD (expandable to 8TB)",
      "Night Vision": "40m IR range",
      "Weather Rating": "IP66",
    },
  },
  {
    id: "cctv-003",
    name: "Dahua 4MP PTZ Wi-Fi Camera",
    category: "cctv",
    price: 8990,
    originalPrice: 11990,
    image: catCctv,
    specs: ["4MP", "PTZ 355° Pan", "Wi-Fi + Cloud"],
    emi: "₹899/mo",
    delivery: "Delivered in 2–3 days",
    badge: "Best Seller",
    rating: 4.6,
    reviews: 876,
    brand: "Dahua",
    inStock: true,
    cameraType: "PTZ",
    resolution: "4MP",
    nightVision: true,
    storageType: "Cloud",
    description: "Smart 4MP PTZ camera with 355° pan and 90° tilt. Wi-Fi enabled with cloud storage option and two-way audio.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "4MP (2560 × 1440)",
      "Pan/Tilt": "355° Pan, 90° Tilt",
      "Night Vision": "10m IR + Spotlight",
      "Storage": "MicroSD (up to 256GB) + Cloud",
      "Connectivity": "Wi-Fi 2.4GHz",
      "Audio": "Two-way audio",
      "Smart Features": "Motion detection, Person detection",
    },
  },
  {
    id: "cctv-004",
    name: "Hikvision 16-Channel 4MP Enterprise Kit",
    category: "cctv",
    price: 64990,
    originalPrice: 79990,
    image: prodBulletCam,
    specs: ["16 Cameras", "4MP", "PoE NVR"],
    emi: "₹5,416/mo",
    delivery: "Delivered in 3–5 days",
    rating: 4.7,
    reviews: 124,
    brand: "Hikvision",
    inStock: true,
    cameraType: "Bullet",
    resolution: "4MP",
    nightVision: true,
    storageType: "HDD",
    description: "Enterprise-grade 16-camera IP surveillance with PoE NVR. Ideal for large offices, warehouses, and campuses.",
    warranty: "3 Year Manufacturer Warranty",
    fullSpecs: {
      "Cameras": "16 × 4MP IP Bullet",
      "NVR": "16-Channel PoE NVR, 4TB HDD",
      "Night Vision": "50m EXIR",
      "Features": "VCA analytics, face detection",
    },
  },
  {
    id: "cctv-005",
    name: "CP Plus 2MP Dome Camera (Single)",
    category: "cctv",
    price: 2490,
    originalPrice: 3490,
    image: catCctv,
    specs: ["2MP", "Dome", "20m Night Vision"],
    emi: "₹249/mo",
    delivery: "Delivered in 1–2 days",
    rating: 4.2,
    reviews: 1204,
    brand: "CP Plus",
    inStock: true,
    cameraType: "Dome",
    resolution: "Full HD",
    nightVision: true,
    storageType: "HDD",
    description: "Affordable 2MP dome camera for indoor use. Easy to install, compact design.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Resolution": "2MP (1920 × 1080)",
      "Lens": "3.6mm fixed",
      "Night Vision": "20m IR",
      "Power": "12V DC",
    },
  },
  // HOME THEATER
  {
    id: "ht-001",
    name: "JBL Bar 1000 7.1.4 Soundbar System",
    category: "home-theater",
    price: 119990,
    originalPrice: 139990,
    image: catHometheater,
    specs: ["7.1.4 Channel", "880W Output", "Dolby Atmos"],
    emi: "₹3,999/mo",
    delivery: "Delivered in 3–5 days",
    rating: 4.6,
    reviews: 178,
    brand: "JBL",
    inStock: true,
    channels: "7.1",
    powerOutput: "880W",
    connectivity: "HDMI ARC",
    description: "Premium 7.1.4 channel soundbar with detachable surround speakers and wireless subwoofer. True Dolby Atmos and DTS:X immersive audio.",
    highlights: ["7.1.4 channel with detachable surrounds", "880W total output power", "Dolby Atmos & DTS:X", "Wireless 10\" subwoofer", "HDMI eARC, Bluetooth 5.0, AirPlay 2"],
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Channels": "7.1.4",
      "Power Output": "880W RMS",
      "Subwoofer": "10\" Wireless",
      "Audio Formats": "Dolby Atmos, DTS:X, Dolby Digital+",
      "Connectivity": "HDMI eARC, Optical, Bluetooth 5.0, AirPlay 2, Chromecast",
      "Drivers": "17 drivers total",
      "Dimensions (Bar)": "884 × 56 × 120 mm",
      "Weight (System)": "18.1 kg",
    },
  },
  {
    id: "ht-002",
    name: "Sony HT-A5000 5.1.2 Premium Soundbar",
    category: "home-theater",
    price: 89990,
    originalPrice: 109990,
    image: prodSoundbar,
    specs: ["5.1.2 Channel", "450W Output", "360 Spatial Sound"],
    emi: "₹2,999/mo",
    delivery: "Delivered in 2–4 days",
    badge: "Premium",
    rating: 4.8,
    reviews: 95,
    brand: "Sony",
    inStock: true,
    channels: "5.1",
    powerOutput: "450W",
    connectivity: "HDMI ARC",
    description: "Sony's flagship soundbar with 360 Spatial Sound Mapping and Dolby Atmos for immersive audio that fills the room.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Channels": "5.1.2",
      "Power Output": "450W",
      "Audio": "Dolby Atmos, DTS:X, 360 Reality Audio",
      "Connectivity": "HDMI eARC, Optical, Bluetooth 5.0",
    },
  },
  {
    id: "ht-003",
    name: "Samsung HW-B550 2.1 Soundbar",
    category: "home-theater",
    price: 14990,
    originalPrice: 19990,
    image: prodSoundbar,
    specs: ["2.1 Channel", "410W Output", "Wireless Sub"],
    emi: "₹1,499/mo",
    delivery: "Delivered in 2–3 days",
    badge: "Budget Pick",
    rating: 4.3,
    reviews: 654,
    brand: "Samsung",
    inStock: true,
    channels: "2.1",
    powerOutput: "410W",
    connectivity: "Bluetooth",
    description: "Affordable 2.1 soundbar with wireless subwoofer. Great bass and clear dialogue enhancement.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Channels": "2.1",
      "Power Output": "410W",
      "Subwoofer": "Wireless",
      "Connectivity": "HDMI, Optical, Bluetooth 5.0",
    },
  },
  {
    id: "ht-004",
    name: "Bose Smart Soundbar 700 + Bass Module",
    category: "home-theater",
    price: 139990,
    image: prodSoundbar,
    specs: ["5.1 Ready", "Premium Audio", "Voice Control"],
    emi: "₹4,666/mo",
    delivery: "Delivered in 3–5 days",
    rating: 4.9,
    reviews: 67,
    brand: "Bose",
    inStock: true,
    channels: "5.1",
    powerOutput: "Premium",
    connectivity: "HDMI ARC",
    description: "Bose's best soundbar with PhaseGuide technology and built-in voice assistants. Expandable to full 5.1 surround.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Type": "Soundbar + Bass Module 700",
      "Voice Assistants": "Alexa, Google Assistant",
      "Connectivity": "HDMI eARC, Optical, Wi-Fi, Bluetooth, AirPlay 2",
      "Expandable": "Add Bose surround speakers for 5.1",
    },
  },
  // PROJECTOR SCREENS
  {
    id: "scr-001",
    name: "Elite Screens 120\" Motorized Projector Screen",
    category: "screens",
    price: 18990,
    originalPrice: 24990,
    image: catScreen,
    specs: ["120\" Diagonal", "16:9 Aspect", "Motorized"],
    emi: "₹1,599/mo",
    delivery: "Delivered in 2–4 days",
    badge: "Deal",
    rating: 4.5,
    reviews: 89,
    brand: "Elite Screens",
    inStock: true,
    description: "Premium 120\" motorized screen with MaxWhite FG material. IR/RF remote control and smooth quiet operation.",
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Size": "120\" Diagonal (104.7\" W × 58.9\" H)",
      "Aspect Ratio": "16:9",
      "Material": "MaxWhite FG (1.1 Gain)",
      "Type": "Motorized (Electric)",
      "Control": "IR/RF Remote, 12V Trigger",
      "Black Drop": "12\" Top",
    },
  },
  {
    id: "scr-002",
    name: "XP Screens 100\" Manual Pull-Down Screen",
    category: "screens",
    price: 4990,
    originalPrice: 6990,
    image: catScreen,
    specs: ["100\" Diagonal", "4:3 Aspect", "Manual Pull-Down"],
    emi: "₹499/mo",
    delivery: "Delivered in 1–2 days",
    badge: "Budget Pick",
    rating: 4.1,
    reviews: 1832,
    brand: "XP Screens",
    inStock: true,
    description: "Affordable manual pull-down screen, ideal for classrooms and small offices.",
    warranty: "1 Year Manufacturer Warranty",
    fullSpecs: {
      "Size": "100\" Diagonal",
      "Aspect Ratio": "4:3",
      "Material": "Matte White (1.0 Gain)",
      "Type": "Manual Pull-Down",
    },
  },
  {
    id: "scr-003",
    name: "Silver Ticket 150\" Fixed Frame Screen",
    category: "screens",
    price: 32990,
    originalPrice: 39990,
    image: catScreen,
    specs: ["150\" Diagonal", "16:9 Aspect", "Fixed Frame ALR"],
    emi: "₹2,749/mo",
    delivery: "Delivered in 5–7 days",
    rating: 4.7,
    reviews: 54,
    brand: "Silver Ticket",
    inStock: true,
    description: "Cinema-grade 150\" fixed frame screen with ambient light rejecting material for dedicated home theaters.",
    warranty: "2 Year Manufacturer Warranty",
    fullSpecs: {
      "Size": "150\" Diagonal",
      "Aspect Ratio": "16:9",
      "Material": "ALR (0.8 Gain)",
      "Type": "Fixed Frame (Aluminum)",
      "Border": "3\" Velvet-covered border",
    },
  },
];

export const featuredProducts = allProducts.filter((_, i) => i < 6);

export const bundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Home Cinema Complete Package",
    products: ["4K Projector", "120\" Motorized Screen", "5.1 Surround Sound"],
    originalPrice: 189970,
    bundlePrice: 154990,
    savings: 34980,
    image: catProjector,
  },
  {
    id: "bundle-2",
    name: "Office CCTV Security Package",
    products: ["8-Ch DVR", "8× 2MP Cameras", "2TB HDD", "Installation"],
    originalPrice: 42970,
    bundlePrice: 34990,
    savings: 7980,
    image: catCctv,
  },
  {
    id: "bundle-3",
    name: "Conference Room AV Setup",
    products: ["Short-throw Projector", "84\" Fixed Screen", "Wireless Presenter"],
    originalPrice: 89970,
    bundlePrice: 74990,
    savings: 14980,
    image: catScreen,
  },
];

export const getProductsByCategory = (categorySlug: string) =>
  allProducts.filter((p) => p.category === categorySlug);

export const getProductById = (id: string) =>
  allProducts.find((p) => p.id === id);

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export type FilterConfig = {
  label: string;
  key: string;
  options: string[];
};

export const filtersByCategory: Record<string, FilterConfig[]> = {
  projectors: [
    { label: "Brand", key: "brand", options: ["Epson", "BenQ", "Optoma", "ViewSonic", "XGIMI"] },
    { label: "Resolution", key: "resolution", options: ["HD", "Full HD", "4K"] },
    { label: "Lumens", key: "lumens", options: ["Under 1000", "1000–3000", "3000–5000", "5000+"] },
    { label: "Throw Distance", key: "throwDistance", options: ["Short Throw", "Standard"] },
    { label: "Usage", key: "usage", options: ["Home", "Office", "Outdoor"] },
  ],
  cctv: [
    { label: "Brand", key: "brand", options: ["Hikvision", "CP Plus", "Dahua"] },
    { label: "Camera Type", key: "cameraType", options: ["Dome", "Bullet", "PTZ"] },
    { label: "Resolution", key: "resolution", options: ["Full HD", "4MP", "5MP"] },
    { label: "Night Vision", key: "nightVision", options: ["Yes"] },
    { label: "Storage", key: "storageType", options: ["HDD", "Cloud"] },
  ],
  "home-theater": [
    { label: "Brand", key: "brand", options: ["JBL", "Sony", "Samsung", "Bose"] },
    { label: "Channels", key: "channels", options: ["2.1", "5.1", "7.1"] },
    { label: "Connectivity", key: "connectivity", options: ["Bluetooth", "HDMI ARC"] },
  ],
  screens: [
    { label: "Brand", key: "brand", options: ["Elite Screens", "XP Screens", "Silver Ticket"] },
  ],
  tvs: [
    { label: "Brand", key: "brand", options: ["Samsung", "LG", "Sony"] },
  ],
};
