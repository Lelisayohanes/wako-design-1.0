'use client'

import React, { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

// Define a type for the product
interface Image {
  image_type: string;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discount: string;
  images: Image[];
  category: string | null;
}

// Fetch products from the API
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/ecommerce/products/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Ensure this is only called once
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // Rethrow if you want to catch it later
  }
};



export function ProductCollectionPageComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('popularity')

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getProducts();
  }, [])

  const productsPerPage = 9
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <Slider defaultValue={[0, 100]} max={100} step={1} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map((color) => (
                <div key={color} className="flex items-center">
                  <Checkbox id={`color-${color}`} />
                  <Label htmlFor={`color-${color}`} className="ml-2">{color}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <RadioGroup defaultValue="medium">
              {['Small', 'Medium', 'Large', 'XL'].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.toLowerCase()} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Dress Style</h3>
            <div className="space-y-2">
              {['Casual', 'Formal', 'Sporty'].map((style) => (
                <div key={style} className="flex items-center">
                  <Checkbox id={`style-${style}`} />
                  <Label htmlFor={`style-${style}`} className="ml-2">{style}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Package Type</h3>
            <div className="space-y-2">
              {['Single', 'Set', 'Bulk'].map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox id={`package-${type}`} />
                  <Label htmlFor={`package-${type}`} className="ml-2">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Product Display */}
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex justify-end">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="bestSellers">Best Sellers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              
              <Card key={product.id}>
                
                <CardContent className="p-4">
                  
                <img
                    src={`http://127.0.0.1:8000/${product.images.find(image => image.image_type === 'main')?.image_url}`}
                    alt={product.images.find(image=>{
                      image.image_type == 'main'
                    })?.image_url}
                    className="w-full h-48 object-cover mb-4"
                  />

                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">Rating: N/A</span>
                  </div>
                  <p className="text-xl font-bold">${product.price}</p>
                  {product.discount && <p className="text-red-500 line-through">${product.discount}</p>}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>


          <div className="mt-8 flex justify-center">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
