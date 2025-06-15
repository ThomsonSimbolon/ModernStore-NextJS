"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

// Mock product data - in real app this would come from an API
const products = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    description: "High-performance laptop for professionals",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=600",
    details: [
      "15.6-inch 4K UHD Display",
      "32GB DDR4 RAM",
      "1TB NVMe SSD Storage",
      "Intel Core i7 12th Gen Processor",
      "NVIDIA RTX 3060 Graphics",
    ],
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium noise-canceling headphones",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    details: [
      "Active Noise Cancellation",
      "40mm Drivers for Deep Bass",
      "Up to 30 Hours Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Memory Foam Ear Cushions",
    ],
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 299.99,
    description: "Feature-rich smartwatch with health tracking",
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&w=600",
    details: [
      "1.4-inch AMOLED Display",
      "Heart Rate and SpO2 Monitoring",
      "Built-in GPS",
      "Up to 14 Days Battery Life",
      "Water Resistant up to 50m",
    ],
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 59.99,
    description: "Ergonomic mouse with customizable buttons",
    image:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&w=600",
    details: [
      "16,000 DPI Optical Sensor",
      "6 Programmable Buttons",
      "RGB Lighting Customization",
      "1ms Response Time",
      "Ergonomic Design for Comfort",
    ],
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard for gamers",
    image:
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&w=600",
    details: [
      "Cherry MX Red Switches",
      "Per-Key RGB Lighting",
      "Anti-Ghosting with N-Key Rollover",
      "Aluminum Frame",
      "Detachable USB-C Cable",
    ],
  },
  {
    id: 6,
    name: "4K Monitor",
    price: 399.99,
    description: "Ultra HD monitor with vibrant colors",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&w=600",
    details: [
      "27-inch 4K IPS Panel",
      "99% sRGB Color Gamut",
      "HDR10 Support",
      "1ms Response Time",
      "HDMI and DisplayPort Inputs",
    ],
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable speaker with deep bass",
    image:
      "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&w=600",
    details: [
      "20W Output Power",
      "IPX7 Waterproof Rating",
      "Up to 12 Hours Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Built-in Microphone",
    ],
  },
  {
    id: 8,
    name: "DSLR Camera",
    price: 599.99,
    description: "Capture stunning photos and videos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-A2JcHhsxx_sHsRllyqjlmHKjcZvOFap29w&s",
    details: [
      "24.2MP APS-C Sensor",
      "4K Video Recording",
      "Dual Pixel Autofocus",
      "3-inch Articulating Touchscreen",
      "Wi-Fi and Bluetooth Connectivity",
    ],
  },
  {
    id: 9,
    name: "Tablet Pro",
    price: 499.99,
    description: "High-resolution display tablet",
    image:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600",
    details: [
      "11-inch Liquid Retina Display",
      "256GB Storage",
      "Apple M1 Chip",
      "Up to 10 Hours Battery Life",
      "Support for Apple Pencil",
    ],
  },
  {
    id: 10,
    name: "Fitness Tracker",
    price: 79.99,
    description: "Track your daily activity and health",
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&w=600",
    details: [
      "0.96-inch OLED Display",
      "Heart Rate Monitoring",
      "Sleep Tracking",
      "IP68 Waterproof",
      "Up to 7 Days Battery Life",
    ],
  },
  {
    id: 11,
    name: "Drone",
    price: 899.99,
    description: "Aerial photography drone",
    image:
      "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&w=600",
    details: [
      "4K HDR Camera",
      "30 Minutes Flight Time",
      "GPS and GLONASS Positioning",
      "3-Axis Gimbal Stabilization",
      "10km Transmission Range",
    ],
  },
  {
    id: 12,
    name: "Smart TV",
    price: 799.99,
    description: "4K UHD Smart TV with HDR",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    details: [
      "55-inch 4K LED Display",
      "Dolby Vision and HDR10+",
      "Built-in Roku OS",
      "120Hz Refresh Rate",
      "4 HDMI Ports",
    ],
  },
  {
    id: 13,
    name: "Wireless Charger",
    price: 39.99,
    description: "Fast wireless charging pad",
    image:
      "https://jete.id/wp-content/uploads/2024/11/Jenis-Wireless-Charging-1.jpeg",
    details: [
      "15W Fast Charging",
      "Qi-Certified Compatibility",
      "Non-Slip Surface",
      "LED Charging Indicator",
      "USB-C Input",
    ],
  },
  {
    id: 14,
    name: "VR Headset",
    price: 349.99,
    description: "Immersive virtual reality experience",
    image:
      "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&w=600",
    details: [
      "120° Field of View",
      "2560x1440 Resolution per Eye",
      "90Hz Refresh Rate",
      "6DoF Tracking",
      "Adjustable Head Strap",
    ],
  },
  {
    id: 15,
    name: "Action Camera",
    price: 249.99,
    description: "Waterproof action camera for adventures",
    image:
      "https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&w=600",
    details: [
      "4K Video at 60fps",
      "Waterproof up to 40m",
      "Electronic Image Stabilization",
      "2-inch Touchscreen",
      "Wi-Fi Connectivity",
    ],
  },
  {
    id: 16,
    name: "Portable SSD",
    price: 149.99,
    description: "High-speed portable storage",
    image:
      "https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&w=600",
    details: [
      "1TB Storage Capacity",
      "Up to 1050MB/s Read Speed",
      "USB-C 3.2 Gen 2 Interface",
      "Shock-Resistant Design",
      "AES 256-bit Encryption",
    ],
  },
  {
    id: 17,
    name: "Smart Light Bulb",
    price: 24.99,
    description: "Color-changing smart bulb",
    image: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg",
    details: [
      "16 Million Colors",
      "800 Lumens Brightness",
      "Wi-Fi and Bluetooth Control",
      "Compatible with Alexa and Google Home",
      "E26/E27 Base",
    ],
  },
  {
    id: 18,
    name: "E-Reader",
    price: 129.99,
    description: "Read books on the go",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    details: [
      "6-inch E-Ink Display",
      "8GB Storage",
      "Adjustable Warm Light",
      "Weeks-Long Battery Life",
      "IPX8 Waterproof",
    ],
  },
  {
    id: 19,
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    description: "Compact earbuds with noise cancellation",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    details: [
      "Active Noise Cancellation",
      "Up to 6 Hours Playtime per Charge",
      "IPX5 Water Resistance",
      "Bluetooth 5.2",
      "Wireless Charging Case",
    ],
  },
  {
    id: 20,
    name: "Smart Home Hub",
    price: 99.99,
    description: "Control all your smart devices",
    image: "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg",
    details: [
      "Zigbee, Z-Wave, and Wi-Fi Support",
      "Voice Control with Alexa",
      "Custom Automation Scenes",
      "Compact Design",
      "App Control via iOS/Android",
    ],
  },
  {
    id: 21,
    name: "Gaming Chair",
    price: 299.99,
    description: "Ergonomic chair for gamers",
    image: "https://images.pexels.com/photos/907221/pexels-photo-907221.jpeg",
    details: [
      "Adjustable Lumbar Support",
      "4D Armrests",
      "Reclines up to 180°",
      "High-Density Foam Cushion",
      "PU Leather Upholstery",
    ],
  },
  {
    id: 22,
    name: "Webcam HD",
    price: 59.99,
    description: "High-definition webcam for streaming",
    image: "https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg",
    details: [
      "1080p Resolution at 30fps",
      "Built-in Stereo Microphone",
      "Autofocus Lens",
      "USB Plug-and-Play",
      "Privacy Shutter",
    ],
  },
  {
    id: 23,
    name: "Smart Thermostat",
    price: 199.99,
    description: "Save energy with smart temperature control",
    image: "https://images.pexels.com/photos/256318/pexels-photo-256318.jpeg",
    details: [
      "Touchscreen Display",
      "Wi-Fi Connectivity",
      "Geofencing Technology",
      "Compatible with Alexa and Google Assistant",
      "Energy Usage Reports",
    ],
  },
  {
    id: 24,
    name: "Wireless Mouse",
    price: 29.99,
    description: "Comfortable wireless mouse",
    image:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&w=600",
    details: [
      "2.4GHz Wireless Connectivity",
      "1200 DPI Optical Sensor",
      "Ergonomic Design",
      "Up to 12 Months Battery Life",
      "USB Receiver",
    ],
  },
  {
    id: 25,
    name: "Laptop Stand",
    price: 49.99,
    description: "Adjustable stand for laptops",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    details: [
      "Adjustable Height and Angle",
      "Aluminum Alloy Construction",
      "Supports up to 17-inch Laptops",
      "Non-Slip Silicone Pads",
      "Foldable and Portable",
    ],
  },
  {
    id: 26,
    name: "USB-C Hub",
    price: 39.99,
    description: "Expand your laptop connectivity",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    details: [
      "4K HDMI Output",
      "2 USB 3.0 Ports",
      "SD and MicroSD Card Slots",
      "100W Power Delivery",
      "Compact Aluminum Design",
    ],
  },
  {
    id: 27,
    name: "Mechanical Pencil",
    price: 9.99,
    description: "Precision writing instrument",
    image:
      "https://images.pexels.com/photos/159644/art-supplies-brushes-rulers-scissors-159644.jpeg?auto=compress&w=600",
    details: [
      "0.5mm Lead Size",
      "Metal Barrel",
      "Ergonomic Grip",
      "Refillable Lead and Eraser",
      "Clip for Easy Carrying",
    ],
  },
  {
    id: 28,
    name: "Photo Printer",
    price: 179.99,
    description: "Print high-quality photos at home",
    image:
      "https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&w=600",
    details: [
      "Dye-Sublimation Technology",
      "4x6-inch Photo Prints",
      "Wi-Fi and Bluetooth Connectivity",
      "Prints in 60 Seconds",
      "Water-Resistant Prints",
    ],
  },
  {
    id: 29,
    name: "Smart Plug",
    price: 19.99,
    description: "Control your devices remotely",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    details: [
      "Wi-Fi Enabled",
      "Compatible with Alexa and Google Home",
      "Energy Monitoring",
      "Schedule and Timer Functions",
      "Compact Design",
    ],
  },
  {
    id: 30,
    name: "Bluetooth Keyboard",
    price: 49.99,
    description: "Slim wireless keyboard",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg",
    details: [
      "Bluetooth 5.0 Connectivity",
      "Scissor-Switch Keys",
      "Up to 3 Devices Pairing",
      "Rechargeable Battery",
      "Slim Aluminum Design",
    ],
  },
  {
    id: 31,
    name: "Portable Projector",
    price: 299.99,
    description: "Project movies anywhere",
    image:
      "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&w=600",
    details: [
      "1080p Resolution",
      "200 ANSI Lumens",
      "Built-in 10W Speakers",
      "HDMI and USB Inputs",
      "Up to 3 Hours Battery Life",
    ],
  },
  {
    id: 32,
    name: "Smart Door Lock",
    price: 199.99,
    description: "Keyless entry for your home",
    image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
    details: [
      "Fingerprint and Keypad Access",
      "Wi-Fi Connectivity",
      "Remote Unlock via App",
      "Anti-Peeping Password",
      "Low Battery Alerts",
    ],
  },
  {
    id: 33,
    name: "Wireless Router",
    price: 129.99,
    description: "Fast Wi-Fi for your home",
    image: "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg",
    details: [
      "Wi-Fi 6 Technology",
      "Dual-Band 2.4GHz and 5GHz",
      "Up to 3000Mbps Speed",
      "4 Gigabit LAN Ports",
      "MU-MIMO Support",
    ],
  },
  {
    id: 34,
    name: "Electric Toothbrush",
    price: 59.99,
    description: "Smart electric toothbrush",
    image: "https://images.pexels.com/photos/461388/pexels-photo-461388.jpeg",
    details: [
      "5 Brushing Modes",
      "2-Minute Timer",
      "Up to 30 Days Battery Life",
      "Pressure Sensor",
      "Includes 2 Brush Heads",
    ],
  },
  {
    id: 35,
    name: "Smart Scale",
    price: 49.99,
    description: "Track your weight and BMI",
    image:
      "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&w=600",
    details: [
      "Body Composition Analysis",
      "Bluetooth Connectivity",
      "Supports Multiple Users",
      "Tempered Glass Platform",
      "App Integration",
    ],
  },
  {
    id: 36,
    name: "Streaming Stick",
    price: 39.99,
    description: "Stream your favorite shows",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    details: [
      "4K HDR Streaming",
      "Wi-Fi Connectivity",
      "Supports Netflix, Hulu, and More",
      "Voice Remote",
      "HDMI Connection",
    ],
  },
  {
    id: 37,
    name: "Wireless Earphones",
    price: 89.99,
    description: "True wireless stereo earphones",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    details: [
      "Bluetooth 5.2",
      "Up to 5 Hours Playtime",
      "IPX4 Sweat Resistance",
      "Touch Controls",
      "Charging Case with 20 Hours Backup",
    ],
  },
  {
    id: 38,
    name: "Smart Coffee Maker",
    price: 149.99,
    description: "Brew coffee from your phone",
    image: "https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg",
    details: [
      "Wi-Fi Enabled",
      "12-Cup Capacity",
      "Programmable Brewing",
      "Compatible with Alexa",
      "Reusable Filter",
    ],
  },
  {
    id: 39,
    name: "Robot Vacuum",
    price: 299.99,
    description: "Automatic cleaning robot",
    image:
      "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&w=600",
    details: [
      "LIDAR Navigation",
      "2000Pa Suction Power",
      "App and Voice Control",
      "Up to 120 Minutes Runtime",
      "Auto-Recharge Function",
    ],
  },
  {
    id: 40,
    name: "Smart Mirror",
    price: 399.99,
    description: "Interactive smart mirror",
    image: "https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg",
    details: [
      "Touchscreen Display",
      "Wi-Fi and Bluetooth Connectivity",
      "Built-in Speakers",
      "Fitness and Weather Apps",
      "Anti-Fog Technology",
    ],
  },
  {
    id: 41,
    name: "Portable Fan",
    price: 19.99,
    description: "USB rechargeable fan",
    image: "https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg",
    details: [
      "3 Speed Settings",
      "360° Rotation",
      "Up to 6 Hours Battery Life",
      "USB-C Charging",
      "Compact and Lightweight",
    ],
  },
  {
    id: 42,
    name: "Smart Watch Band",
    price: 14.99,
    description: "Customizable watch band",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    details: [
      "Silicone Material",
      "Quick-Release Pins",
      "Adjustable Fit",
      "Sweat and Water Resistant",
      "Multiple Color Options",
    ],
  },
  {
    id: 43,
    name: "Laptop Backpack",
    price: 69.99,
    description: "Water-resistant backpack for laptops",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    details: [
      "Fits up to 15.6-inch Laptops",
      "Water-Resistant Nylon",
      "Padded Shoulder Straps",
      "Multiple Compartments",
      "USB Charging Port",
    ],
  },
  {
    id: 44,
    name: "Wireless Gamepad",
    price: 59.99,
    description: "Bluetooth controller for gaming",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg",
    details: [
      "Bluetooth and USB Connectivity",
      "Dual Vibration Motors",
      "Rechargeable Battery",
      "Compatible with PC and Consoles",
      "Ergonomic Grip",
    ],
  },
  {
    id: 45,
    name: "Smart Air Purifier",
    price: 249.99,
    description: "Clean air for your home",
    image: "https://images.pexels.com/photos/395223/pexels-photo-395223.jpeg",
    details: [
      "HEPA Filter",
      "Covers up to 500 sq ft",
      "Wi-Fi and App Control",
      "Real-Time Air Quality Monitor",
      "Quiet Operation",
    ],
  },
  {
    id: 46,
    name: "Portable Power Bank",
    price: 39.99,
    description: "Charge your devices on the go",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    details: [
      "10,000mAh Capacity",
      "Dual USB-A Outputs",
      "USB-C Input/Output",
      "LED Power Indicator",
      "Compact Design",
    ],
  },
  {
    id: 47,
    name: "Wireless Security Camera",
    price: 129.99,
    description: "Monitor your home remotely",
    image: "https://images.pexels.com/photos/207574/pexels-photo-207574.jpeg",
    details: [
      "1080p HD Video",
      "Night Vision up to 30ft",
      "Motion Detection Alerts",
      "Two-Way Audio",
      "Weatherproof Design",
    ],
  },
  {
    id: 48,
    name: "Smart Water Bottle",
    price: 29.99,
    description: "Tracks your hydration",
    image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
    details: [
      "24oz Capacity",
      "Bluetooth Hydration Tracking",
      "LED Reminder Lights",
      "BPA-Free Material",
      "App Integration",
    ],
  },
  {
    id: 49,
    name: "Electric Scooter",
    price: 499.99,
    description: "Eco-friendly urban transport",
    image: "https://images.pexels.com/photos/2265480/pexels-photo-2265480.jpeg",
    details: [
      "25km/h Top Speed",
      "30km Range per Charge",
      "8.5-inch Pneumatic Tires",
      "Foldable Design",
      "LED Headlight and Taillight",
    ],
  },
  {
    id: 50,
    name: "Smart Alarm Clock",
    price: 59.99,
    description: "Wake up smarter every day",
    image: "https://images.pexels.com/photos/1198264/pexels-photo-1198264.jpeg",
    details: [
      "Sunrise Simulation",
      "FM Radio",
      "USB Charging Port",
      "Voice Control with Alexa",
      "Customizable Alarm Sounds",
    ],
  },
  {
    id: 51,
    name: "Digital Photo Frame",
    price: 89.99,
    description: "Display your favorite memories",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    details: [
      "10-inch IPS Display",
      "16GB Internal Storage",
      "Wi-Fi Photo Upload",
      "Motion Sensor",
      "Supports Photos and Videos",
    ],
  },
  {
    id: 52,
    name: "Smart Pet Feeder",
    price: 129.99,
    description: "Automated feeding for your pets",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    details: [
      "6L Food Capacity",
      "Wi-Fi and App Control",
      "Built-in HD Camera",
      "Voice Recording for Feeding Calls",
      "Scheduled Feeding",
    ],
  },
  {
    id: 53,
    name: "Wireless Charging Pad",
    price: 24.99,
    description: "Fast charging for your devices",
    image:
      "https://jete.id/wp-content/uploads/2024/11/Jenis-Wireless-Charging-1.jpeg",
    details: [
      "10W Fast Charging",
      "Qi-Compatible",
      "Slim and Lightweight",
      "Anti-Slip Design",
      "USB-C Cable Included",
    ],
  },
  {
    id: 54,
    name: "Smart Garden System",
    price: 199.99,
    description: "Automate your home gardening",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    details: [
      "Self-Watering System",
      "LED Grow Lights",
      "App-Controlled Nutrient Delivery",
      "Supports 6 Plants",
      "Compact Countertop Design",
    ],
  },
];

export default function ProductPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      },
    });
    toast.success(
      `Added ${quantity} ${product.name}${quantity > 1 ? "s" : ""} to cart`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild className="mb-8">
        <Link href="/">← Back to Products</Link>
      </Button>

      <Card className="grid md:grid-cols-2 gap-8 p-6">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-5">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-600">
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </div>

          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
