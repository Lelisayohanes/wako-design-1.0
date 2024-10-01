'use client'

import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, ShoppingCart, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ReviewFaq } from '@/app/(components)/review-and-faq'

// Mock data for the example
const tshirtData = {
  name: "Premium Cotton Blend Tee",
  price: 29.99,
  originalPrice: 39.99,
  description: "Experience ultimate comfort with our Premium Cotton Blend Tee. Made from 60% combed ringspun cotton and 40% polyester, this shirt offers a perfect balance of softness and durability. The modern fit flatters all body types, making it a versatile addition to your wardrobe.",
  colors: ["White", "Black", "Navy", "Gray"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "/images/image.png?height=600&width=600",
    "/images/new-right.png?height=600&width=600",
    "/images/left-side.png?height=600&width=600",
    "/images/right-side.png?height=600&width=600",
    "/images/image.png?height=600&width=600",
    "/images/new-right.png?height=600&width=600",
    "/images/left-side.png?height=600&width=600",
    "/images/right-side.png?height=600&width=600"
  ],
  rating: 4.5,
  reviewCount: 128,
}

const relatedProducts = [
  { id: 1, name: "V-Neck Tee", price: 24.99, image: "/images/image.png?height=300&width=200" },
  { id: 2, name: "Long Sleeve Tee", price: 34.99, image: "/images/new-right.png?height=300&width=200" },
  { id: 3, name: "Graphic Print Tee", price: 27.99, image: "/images/left-side.png?height=300&width=200" },
  { id: 4, name: "Striped Tee", price: 29.99, image: "/images/right-side.png?height=300&width=200" },
]

export function TShirtDetailPageComponent() {
  const [selectedColor, setSelectedColor] = useState(tshirtData.colors[0])
  const [selectedSize, setSelectedSize] = useState(tshirtData.sizes[2])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tshirtData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + tshirtData.images.length) % tshirtData.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Image Display */}
        <div className="relative">
         <div className=' flex justify-center'>
         <img
            src={tshirtData.images[currentImageIndex]}
            alt={`${tshirtData.name} - View ${currentImageIndex + 1}`}
            className=" rounded-lg  h-[60vh] left-6"
          />
         </div>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
            {tshirtData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                  index === currentImageIndex ? 'border-2 border-primary' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{tshirtData.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">${tshirtData.price.toFixed(2)}</span>
            {tshirtData.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${tshirtData.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6">{tshirtData.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex space-x-2">
              {tshirtData.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${
                    color === selectedColor ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <div className="flex space-x-2">
              {tshirtData.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded ${
                    size === selectedSize
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button className="flex-1" variant="secondary">
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Review Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(tshirtData.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {tshirtData.rating.toFixed(1)} out of 5 ({tshirtData.reviewCount} reviews)
          </span>
        </div>
        {/* Add more detailed review components here */}
        <Button variant="outline">Write a Review</Button>
      </div>
        {/*  self made review  */}
        <ReviewFaq/>
      {/* Related Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-2 rounded-md"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <Button variant="secondary" className="w-full mt-2">
                  Quick Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}