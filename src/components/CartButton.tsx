"use client";

"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartButton() {
  const { state } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Button asChild>
      <Link href="/cart" className="relative">
        Cart
        {mounted && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
