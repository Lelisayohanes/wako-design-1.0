'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for cart items
const initialCartItems = [
  { id: 1, title: 'Classic White T-Shirt', price: 19.99, color: 'White', size: 'M', quantity: 1, image: '/images/new-right.png' },
  { id: 2, title: 'Slim Fit Jeans', price: 49.99, color: 'Blue', size: '32', quantity: 1, image: '/images/right-side.png' },
]

export function CartPageComponent() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.99
  const total = subtotal - discount + deliveryFee

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1)
    } else {
      alert('Invalid promo code')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Cart Items */}
        <div className="w-full lg:w-3/5 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-md" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600">
                  <span className="mr-2">Color: {item.color}</span>
                  <span>Size: {item.size}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeItem(item.id)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="promo-code">Promo Code</Label>
              <div className="flex space-x-2">
                <Input
                  id="promo-code"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode}>Apply</Button>
              </div>
            </div>
            <Button className="w-full text-lg" size="lg">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}