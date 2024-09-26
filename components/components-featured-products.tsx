'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Classic Tee",
    price: 29.99,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    image: "/placeholder.svg"
  }
]

export function FeaturedProductsComponent() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <Image
                  alt={product.name}
                  className="aspect-square object-cover w-full rounded-lg"
                  height="300"
                  src={product.image}
                  width="300"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}