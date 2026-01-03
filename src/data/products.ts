import cuasImage from "@/assets/products/l-02-cuas.jpg";
import c2Image from "@/assets/products/l-04-c2.jpg";
import radarImage from "@/assets/products/n-01-radar.jpg";
import aesaImage from "@/assets/products/a-01-aesa.jpg";
import ewImage from "@/assets/products/a-03-ew.jpg";
import hmdImage from "@/assets/products/a-04-hmd.jpg";

export type ProductCategory = "Land" | "Sea" | "Air";

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  description: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  specs: string[];
}

export const products: Product[] = [
  {
    id: "1",
    code: "L-02",
    name: "Integrated C-UAS Vehicle System",
    category: "Land",
    description: "Counter-drone system with jamming and hard-kill capabilities (laser/net) for base protection.",
    fullDescription: "The L-02 Integrated Counter-Unmanned Aircraft System (C-UAS) represents the pinnacle of mobile base defense technology. This vehicle-mounted platform combines advanced radar detection, RF jamming capabilities, and kinetic interceptors to neutralize hostile drone threats at ranges up to 10km. The system features real-time threat assessment AI, automatic target tracking, and seamless integration with existing base defense networks.",
    price: 4850000,
    imageUrl: cuasImage,
    specs: [
      "Detection Range: 15km",
      "Engagement Range: 10km",
      "Simultaneous Tracks: 200+",
      "Reaction Time: <2 seconds",
      "360° Coverage"
    ]
  },
  {
    id: "2",
    code: "L-04",
    name: "Tactical AI C2 Platform",
    category: "Land",
    description: "Real-time battlefield analysis software with tactical data link integration for optimal deployment.",
    fullDescription: "The L-04 Tactical AI Command & Control Platform revolutionizes battlefield decision-making through advanced machine learning algorithms and multi-domain data fusion. This software suite processes intelligence from ground sensors, aerial assets, and satellite feeds to provide commanders with actionable insights in real-time. Features include predictive threat modeling, automated resource allocation, and secure coalition data sharing.",
    price: 12500000,
    imageUrl: c2Image,
    specs: [
      "Processing: 10M data points/sec",
      "AI Decision Latency: <50ms",
      "Data Links: Link-16, JREAP, VMF",
      "Classification: TS/SCI Compatible",
      "Coalition Interoperability"
    ]
  },
  {
    id: "3",
    code: "N-01",
    name: "Long-Range Naval Air Search Radar",
    category: "Sea",
    description: "S-Band/X-Band integrated radar to supplement Aegis-class destroyers for fleet air defense.",
    fullDescription: "The N-01 Long-Range Naval Air Search Radar system delivers unprecedented situational awareness for surface combatants. This dual-band (S/X) phased array radar integrates seamlessly with Aegis Combat System architecture, extending detection ranges against low-observable threats and hypersonic missiles. Advanced ECCM capabilities ensure reliable tracking in contested electromagnetic environments.",
    price: 78000000,
    imageUrl: radarImage,
    specs: [
      "Detection Range: 400+ km",
      "Track Capacity: 1000+ targets",
      "Bands: S-Band + X-Band",
      "ECCM: Advanced Suite",
      "Aegis Integration Ready"
    ]
  },
  {
    id: "4",
    code: "A-01",
    name: "5th Gen AESA Radar Module",
    category: "Air",
    description: "Active Electronically Scanned Array transceiver module to upgrade detection ranges of fighters like F-16.",
    fullDescription: "The A-01 5th Generation AESA Radar Module delivers transformational air-to-air and air-to-ground sensing capabilities for legacy 4th generation fighter platforms. This drop-in upgrade features 1,200+ T/R modules with GaN technology, providing 40% greater detection range and simultaneous multi-function operation. Fully compatible with F-16, F-15, and F/A-18 aircraft.",
    price: 8750000,
    imageUrl: aesaImage,
    specs: [
      "T/R Modules: 1,200+",
      "Technology: GaN",
      "Range Improvement: +40%",
      "Modes: SAR, GMTI, A2A, A2G",
      "Weight: 165 kg"
    ]
  },
  {
    id: "5",
    code: "A-03",
    name: "Advanced Integrated EW Pod",
    category: "Air",
    description: "Electronic Warfare pod to neutralize enemy radar/comms and ensure aircraft survivability.",
    fullDescription: "The A-03 Advanced Integrated Electronic Warfare Pod represents next-generation aircraft self-protection technology. Combining wide-band digital receivers, cognitive jamming algorithms, and fiber-optic towed decoys, this system provides comprehensive protection against modern integrated air defense systems. The AI-driven threat response system automatically selects optimal countermeasure techniques.",
    price: 6200000,
    imageUrl: ewImage,
    specs: [
      "Frequency Coverage: 0.5-40 GHz",
      "Jamming Modes: 16 simultaneous",
      "AI Threat Response: <10ms",
      "Decoy: Fiber-Optic Towed",
      "Compatible: NATO fighters"
    ]
  },
  {
    id: "6",
    code: "A-04",
    name: "Next-Gen HMD System",
    category: "Air",
    description: "High-res Helmet Mounted Display overlaying flight and target data for enhanced pilot situational awareness.",
    fullDescription: "The A-04 Next-Generation Helmet Mounted Display System delivers unparalleled situational awareness to combat pilots. Featuring 4K resolution micro-displays, eye-tracking weapons cueing, night vision integration, and augmented reality overlays, this system enables pilots to engage targets simply by looking at them. Advanced head tracking provides seamless transition between cockpit displays and external visuals.",
    price: 920000,
    imageUrl: hmdImage,
    specs: [
      "Resolution: 4K per eye",
      "FOV: 100° x 40°",
      "Head Tracking: Sub-milliradian",
      "Night Vision: Integrated",
      "Weight: 1.8 kg"
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};
