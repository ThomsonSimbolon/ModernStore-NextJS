"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/CartButton"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ModernStore
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/">Products</Link>
            </Button>
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
