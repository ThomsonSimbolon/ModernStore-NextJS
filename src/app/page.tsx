"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    description: "High-performance laptop for professionals",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=600",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium noise-canceling headphones",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 299.99,
    description: "Feature-rich smartwatch with health tracking",
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&w=600",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 59.99,
    description: "Ergonomic mouse with customizable buttons",
    image:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&w=600",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard for gamers",
    image:
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&w=600",
  },
  {
    id: 6,
    name: "4K Monitor",
    price: 399.99,
    description: "Ultra HD monitor with vibrant colors",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&w=600",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable speaker with deep bass",
    image:
      "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&w=600",
  },
  {
    id: 8,
    name: "DSLR Camera",
    price: 599.99,
    description: "Capture stunning photos and videos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-A2JcHhsxx_sHsRllyqjlmHKjcZvOFap29w&s",
  },
  {
    id: 9,
    name: "Tablet Pro",
    price: 499.99,
    description: "High-resolution display tablet",
    image:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600",
  },
  {
    id: 10,
    name: "Fitness Tracker",
    price: 79.99,
    description: "Track your daily activity and health",
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&w=600",
  },
  {
    id: 11,
    name: "Drone",
    price: 899.99,
    description: "Aerial photography drone",
    image:
      "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&w=600",
  },
  {
    id: 12,
    name: "Smart TV",
    price: 799.99,
    description: "4K UHD Smart TV with HDR",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
  },
  {
    id: 13,
    name: "Wireless Charger",
    price: 39.99,
    description: "Fast wireless charging pad",
    image:
      "https://jete.id/wp-content/uploads/2024/11/Jenis-Wireless-Charging-1.jpeg",
  },
  {
    id: 14,
    name: "VR Headset",
    price: 349.99,
    description: "Immersive virtual reality experience",
    image:
      "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&w=600",
  },
  {
    id: 15,
    name: "Action Camera",
    price: 249.99,
    description: "Waterproof action camera for adventures",
    image:
      "https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&w=600",
  },
  {
    id: 16,
    name: "Portable SSD",
    price: 149.99,
    description: "High-speed portable storage",
    image:
      "https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&w=600",
  },
  {
    id: 17,
    name: "Smart Light Bulb",
    price: 24.99,
    description: "Color-changing smart bulb",
    image: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg",
  },
  {
    id: 18,
    name: "E-Reader",
    price: 129.99,
    description: "Read books on the go",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
  },
  {
    id: 19,
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    description: "Compact earbuds with noise cancellation",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
  },
  {
    id: 20,
    name: "Smart Home Hub",
    price: 99.99,
    description: "Control all your smart devices",
    image: "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg",
  },
  {
    id: 21,
    name: "Gaming Chair",
    price: 299.99,
    description: "Ergonomic chair for gamers",
    image: "https://images.pexels.com/photos/907221/pexels-photo-907221.jpeg",
  },
  {
    id: 22,
    name: "Webcam HD",
    price: 59.99,
    description: "High-definition webcam for streaming",
    image: "https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg",
  },
  {
    id: 23,
    name: "Smart Thermostat",
    price: 199.99,
    description: "Save energy with smart temperature control",
    image: "https://images.pexels.com/photos/256318/pexels-photo-256318.jpeg",
  },
  {
    id: 24,
    name: "Wireless Mouse",
    price: 29.99,
    description: "Comfortable wireless mouse",
    image:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&w=600",
  },
  {
    id: 25,
    name: "Laptop Stand",
    price: 49.99,
    description: "Adjustable stand for laptops",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
  },
  {
    id: 26,
    name: "USB-C Hub",
    price: 39.99,
    description: "Expand your laptop connectivity",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
  },
  {
    id: 27,
    name: "Mechanical Pencil",
    price: 9.99,
    description: "Precision writing instrument",
    image:
      "https://images.pexels.com/photos/159644/art-supplies-brushes-rulers-scissors-159644.jpeg?auto=compress&w=600",
  },
  {
    id: 28,
    name: "Photo Printer",
    price: 179.99,
    description: "Print high-quality photos at home",
    image:
      "https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&w=600",
  },
  {
    id: 29,
    name: "Smart Plug",
    price: 19.99,
    description: "Control your devices remotely",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
  },
  {
    id: 30,
    name: "Bluetooth Keyboard",
    price: 49.99,
    description: "Slim wireless keyboard",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg",
  },
  {
    id: 31,
    name: "Portable Projector",
    price: 299.99,
    description: "Project movies anywhere",
    image:
      "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&w=600",
  },
  {
    id: 32,
    name: "Smart Door Lock",
    price: 199.99,
    description: "Keyless entry for your home",
    image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
  },
  {
    id: 33,
    name: "Wireless Router",
    price: 129.99,
    description: "Fast Wi-Fi for your home",
    image: "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg",
  },
  {
    id: 34,
    name: "Electric Toothbrush",
    price: 59.99,
    description: "Smart electric toothbrush",
    image: "https://images.pexels.com/photos/461388/pexels-photo-461388.jpeg",
  },
  {
    id: 35,
    name: "Smart Scale",
    price: 49.99,
    description: "Track your weight and BMI",
    image:
      "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&w=600",
  },
  {
    id: 36,
    name: "Streaming Stick",
    price: 39.99,
    description: "Stream your favorite shows",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
  },
  {
    id: 37,
    name: "Wireless Earphones",
    price: 89.99,
    description: "True wireless stereo earphones",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
  },
  {
    id: 38,
    name: "Smart Coffee Maker",
    price: 149.99,
    description: "Brew coffee from your phone",
    image: "https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg",
  },
  {
    id: 39,
    name: "Robot Vacuum",
    price: 299.99,
    description: "Automatic cleaning robot",
    image:
      "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&w=600",
  },
  {
    id: 40,
    name: "Smart Mirror",
    price: 399.99,
    description: "Interactive smart mirror",
    image: "https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg",
  },
  {
    id: 41,
    name: "Portable Fan",
    price: 19.99,
    description: "USB rechargeable fan",
    image: "https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg",
  },
  {
    id: 42,
    name: "Smart Watch Band",
    price: 14.99,
    description: "Customizable watch band",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
  },
  {
    id: 43,
    name: "Laptop Backpack",
    price: 69.99,
    description: "Water-resistant backpack for laptops",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  },
  {
    id: 44,
    name: "Wireless Gamepad",
    price: 59.99,
    description: "Bluetooth controller for gaming",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg",
  },
  {
    id: 45,
    name: "Smart Air Purifier",
    price: 249.99,
    description: "Clean air for your home",
    image: "https://images.pexels.com/photos/395223/pexels-photo-395223.jpeg",
  },
  {
    id: 46,
    name: "Portable Power Bank",
    price: 39.99,
    description: "Charge your devices on the go",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
  },
  {
    id: 47,
    name: "Wireless Security Camera",
    price: 129.99,
    description: "Monitor your home remotely",
    image: "https://images.pexels.com/photos/207574/pexels-photo-207574.jpeg",
  },
  {
    id: 48,
    name: "Smart Water Bottle",
    price: 29.99,
    description: "Tracks your hydration",
    image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
  },
  {
    id: 49,
    name: "Electric Scooter",
    price: 499.99,
    description: "Eco-friendly urban transport",
    image: "https://images.pexels.com/photos/2265480/pexels-photo-2265480.jpeg",
  },
  {
    id: 50,
    name: "Smart Alarm Clock",
    price: 59.99,
    description: "Wake up smarter every day",
    image: "https://images.pexels.com/photos/1198264/pexels-photo-1198264.jpeg",
  },
  {
    id: 51,
    name: "Digital Photo Frame",
    price: 89.99,
    description: "Display your favorite memories",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
  },
  {
    id: 52,
    name: "Smart Pet Feeder",
    price: 129.99,
    description: "Automated feeding for your pets",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  },
  {
    id: 53,
    name: "Wireless Charging Pad",
    price: 24.99,
    description: "Fast charging for your devices",
    image:
      "https://jete.id/wp-content/uploads/2024/11/Jenis-Wireless-Charging-1.jpeg",
  },
  {
    id: 54,
    name: "Smart Garden System",
    price: 199.99,
    description: "Automate your home gardening",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  },
];

export default function Home() {
  // Pagination setup
  const PRODUCTS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover amazing products at great prices
        </p>
      </header>

      {/* Animasi pada grid produk */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block transition-transform hover:scale-105"
            >
              <Card className="overflow-hidden h-full p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover w-full h-full rounded-t-lg"
                    style={{ marginTop: 0, display: "block" }}
                    priority={false}
                    unoptimized={product.image.startsWith("data:image/")}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button>View Details</Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="px-2">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
