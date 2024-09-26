import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ReviewFaq() {
  return (
    <Tabs defaultValue="product_details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="product_details">Product Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>

      {/* Product Details Section */}
      <TabsContent value="product_details">
        <Card className="bg-white p-4">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Detailed information about the product features and materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Experience ultimate comfort with our Premium Cotton Blend Tee. This
              shirt is made from 60% combed ringspun cotton and 40% polyester,
              offering a perfect balance of softness and durability. The modern
              fit flatters all body types, making it a versatile addition to your
              wardrobe.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Material: 60% Cotton, 40% Polyester</li>
              <li>Available Sizes: XS, S, M, L, XL</li>
              <li>Available Colors: White, Black, Navy, Gray</li>
              <li>Modern fit for all body types</li>
              <li>Machine washable and durable fabric</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Reviews Section */}
      <TabsContent value="reviews">
        <Card className="bg-white p-4">
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>
              Read what other customers have to say about this product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Review 1 */}
            <div>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-yellow-500 flex">
                ⭐⭐⭐⭐⭐
              </p>
              <p className="text-gray-700">
                "I love this shirt! It's so soft and fits perfectly. The color is
                vibrant, and it doesn't shrink after washing. Highly recommend!"
              </p>
            </div>
            {/* Review 2 */}
            <div>
              <p className="font-semibold">John Smith</p>
              <p className="text-yellow-500 flex">
                ⭐⭐⭐⭐☆
              </p>
              <p className="text-gray-700">
                "Great quality and very comfortable. The only downside is that it
                runs a bit small, so I suggest sizing up."
              </p>
            </div>
            {/* Add Review Button */}
            <div className="flex items-center space-x-2 mt-4">
              <Input placeholder="Write a review..." className="flex-1" />
              <Button variant="secondary">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* FAQs Section */}
      <TabsContent value="faqs">
        <Card className="bg-white p-4">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to the most commonly asked questions about this product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* FAQ 1 */}
            <div>
              <p className="font-semibold">Q: What is the material of the shirt?</p>
              <p className="text-gray-700">
                A: The shirt is made from 60% combed ringspun cotton and 40%
                polyester, providing a soft and durable fabric.
              </p>
            </div>
            {/* FAQ 2 */}
            <div>
              <p className="font-semibold">
                Q: Does the shirt shrink after washing?
              </p>
              <p className="text-gray-700">
                A: No, the fabric is designed to withstand regular washing without
                significant shrinkage.
              </p>
            </div>
            {/* FAQ 3 */}
            <div>
              <p className="font-semibold">Q: How do I choose the right size?</p>
              <p className="text-gray-700">
                A: Refer to the size guide in the product description for detailed
                measurements and size recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
