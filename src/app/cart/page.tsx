"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { state, dispatch, loading } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const incrementQuantity = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const decrementQuantity = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity - 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Loading Cart...</h1>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart to get started!
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <p className="text-gray-600 mt-1">
          {state.items.length} {state.items.length === 1 ? "item" : "items"} in
          your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.id} className="p-4 md:p-6">
              {/* Desktop Layout */}
              <div className="hidden md:flex gap-4">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-lg">${item.price}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="text-sm">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          decrementQuantity(item.id, item.quantity)
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 h-8 text-center border-0 focus:ring-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          incrementQuantity(item.id, item.quantity)
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: { id: item.id },
                        })
                      }
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="font-semibold text-lg mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => decrementQuantity(item.id, item.quantity)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-12 h-8 text-center border-0 focus:ring-0 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => incrementQuantity(item.id, item.quantity)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: { id: item.id },
                      })
                    }
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-4 md:p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal ({state.items.length} items)</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 font-semibold flex justify-between text-lg">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// File: src/app/cart/page.tsx backup
// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useCart } from "@/context/CartContext";
// import Link from "next/link";
// import Image from "next/image";

// export default function CartPage() {
//   const { state, dispatch, loading } = useCart();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity < 1) {
//       dispatch({ type: "REMOVE_ITEM", payload: { id } });
//       return;
//     }
//     dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Loading Cart...</h1>
//       </div>
//     );
//   }

//   if (state.items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
//         <Button asChild>
//           <Link href="/">Continue Shopping</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           {state.items.map((item) => (
//             <Card key={item.id} className="mb-4 p-4">
//               <div className="flex gap-4">
//                 <div className="w-24 h-24 relative">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={96}
//                     height={96}
//                     className="object-cover w-full h-full rounded"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p className="text-gray-600">${item.price}</p>
//                   <div className="flex items-center gap-4 mt-2">
//                     <label className="text-sm">Quantity:</label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateQuantity(item.id, Number(e.target.value))
//                       }
//                       className="w-20 p-1 border rounded"
//                     />
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() =>
//                         dispatch({
//                           type: "REMOVE_ITEM",
//                           payload: { id: item.id },
//                         })
//                       }
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//         <Card className="p-4 h-fit">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>${state.total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="border-t pt-2 font-semibold flex justify-between">
//               <span>Total</span>
//               <span>${state.total.toFixed(2)}</span>
//             </div>
//           </div>
//           <Button asChild className="w-full">
//             <Link href="/checkout">Proceed to Checkout</Link>
//           </Button>
//         </Card>
//       </div>
//     </div>
//   );
// }
