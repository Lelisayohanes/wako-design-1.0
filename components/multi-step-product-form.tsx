"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ModelImage {
  file: File;
  preview: string;
  dimension: "front" | "back" | "right" | "left";
}


type ProductFormData = {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  shortDescription: string;
  detailedDescription: string;
  price: string;
  discountPrice: string;
  stockQuantity: string;
  sizes: string;
  color: string;
  tags: string[];
  mainImage: File | null;
  thumbnailImages: File[];
  modelImages: ModelImage[];
};

export function MultiStepProductForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    shortDescription: "",
    detailedDescription: "",
    price: "",
    discountPrice: "",
    stockQuantity: "",
    sizes: "",
    color: "",
    tags: [],
    mainImage: null,
    thumbnailImages: [],
    modelImages: [],
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes: string[] = ["S", "M", "L", "XL", "XXL", "3XL"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState<string>("");

  const handleAddColor = () => {
    if (colorInput && !selectedColors.includes(colorInput)) {
      setSelectedColors([...selectedColors, colorInput]);
      setColorInput("");
    }
  };

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const nextStep = () => {
    if (step === 4) {
      handleSubmit();
    } else {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    console.log("Submitting form data:", formData);

    // Prepare the form data for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('subCategory', formData.subCategory);
    formDataToSubmit.append('shortDescription', formData.shortDescription);
    formDataToSubmit.append('detailedDescription', formData.detailedDescription);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('discountPrice', formData.discountPrice);
    formDataToSubmit.append('stockQuantity', formData.stockQuantity);
    formDataToSubmit.append('sizes', JSON.stringify(selectedSizes)); // Assuming sizes is an array
    formDataToSubmit.append('color', JSON.stringify(selectedColors)); // Assuming colors is an array
    formDataToSubmit.append('tags', JSON.stringify(formData.tags)); // Assuming tags is an array
    if (formData.mainImage) {
      formDataToSubmit.append('mainImage', formData.mainImage);
    }
    formData.thumbnailImages.forEach((file, index) => {
      formDataToSubmit.append(`thumbnailImages[${index}]`, file);
    });
    formData.modelImages.forEach((modelImage, index) => {
      formDataToSubmit.append(`modelImages[${index}][file]`, modelImage.file);
      formDataToSubmit.append(`modelImages[${index}][dimension]`, modelImage.dimension);
    });


    try {
      const response = await fetch("http://127.0.0.1:8000/api/ecommerce/products/", {
        method: "POST",
        body: formDataToSubmit,
        headers: {
          // Include other headers here if necessary
          // 'Authorization': `Bearer ${token}`, // For token-based authentication
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      alert("Product submitted successfully!");
    } catch (error) {
      console.log(formData)
      console.error("Error submitting form:", error);
      alert("Failed to submit product. Please try again.");
    }
  };


  const onDrop = (files: File[], field: keyof ProductFormData, index?: number | string) => {
    if (field === "mainImage" && files.length > 0) {
      updateFormData(field, files[0]);
    } else if (field === "thumbnailImages") {
      const newThumbnails = [...formData.thumbnailImages];
      if (typeof index === "number" && index >= 0 && index < 4) {
        newThumbnails[index] = files[0];
      } else {
        newThumbnails.push(...files.slice(0, 4 - newThumbnails.length));
      }
      updateFormData(field, newThumbnails);
    } else if (field === "modelImages" && typeof index === "string") {
      const newModelImage: ModelImage = {
        file: files[0],
        preview: URL.createObjectURL(files[0]),
        dimension: index as "front" | "back" | "right" | "left",
      };
      const newModelImages = formData.modelImages.filter((img) => img.dimension !== index);
      newModelImages.push(newModelImage);
      updateFormData(field, newModelImages);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 bg-green-600 p-6 lg:min-w-[600px] lg:max-w-[600px] lg:h-[70vh]">
            <CardDescription>Basic info of product</CardDescription>
            <div>
              <Label htmlFor="name">Name Product</Label>
              <Input
                id="name"
                placeholder="Graphic T-Shirt"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="T-Shirts"
                value={formData.category}
                onChange={(e) => updateFormData("category", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief overview of the product"
                value={formData.shortDescription}
                onChange={(e) => updateFormData("shortDescription", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="detailedDescription">Detailed Description</Label>
              <Textarea
                id="detailedDescription"
                placeholder="Detailed overview of the product"
                value={formData.detailedDescription}
                onChange={(e) => updateFormData("detailedDescription", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag) => (
                  <span key={tag} className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-sm">
                    {tag}
                    <button className="ml-2 text-destructive" onClick={() => removeTag(tag)}>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["man", "women", "special", "bridal", "birthday", "graduation", "others"].map((tag) => (
                  <button
                    key={tag}
                    className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
        break;
      case 2:
        return (
          <div className="space-y-6 bg-yellow-300 p-6 lg:min-w-[600px] lg:max-w-[600px]  lg:h-[70vh] flex flex-col justify-center" >
            <div >
              <Label htmlFor="mainImage">Main Image</Label>
              <Card className="mt-2">
                <CardContent className="p-0">
                  <div
                    className="h-28 flex items-center justify-center bg-secondary text-secondary-foreground relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      onDrop(Array.from(e.dataTransfer.files), 'mainImage');
                    }}
                  >
                    {formData.mainImage ? (
                      <>
                        <img
                          src={URL.createObjectURL(formData.mainImage)}
                          alt="Main product"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => updateFormData("mainImage", null)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="font-medium">Main Image</p>
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          onDrop(Array.from(e.target.files), 'mainImage');
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Label htmlFor="thumbnailImages">Thumbnail Images (select up to 4)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div
                        className="h-28 flex items-center justify-center bg-secondary text-secondary-foreground relative"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          onDrop(Array.from(e.dataTransfer.files), 'thumbnailImages', index);
                        }}
                      >
                        {formData.thumbnailImages[index] ? (
                          <>
                            <img
                              src={URL.createObjectURL(formData.thumbnailImages[index])}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => {
                                const updatedThumbnails = [...formData.thumbnailImages]
                                updatedThumbnails.splice(index, 1)
                                updateFormData("thumbnailImages", updatedThumbnails)
                              }}
                              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-center">
                            <p className="font-medium">Thumbnail {index + 1}</p>
                            <p className="text-sm text-muted-foreground">Drag & drop or click</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              onDrop(Array.from(e.target.files), 'thumbnailImages', index);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <Label>Model Images</Label>

              <div className=" flex w-full gap-5">
                {["front", "back", "right", "left"].map((dimension) => (
                  <div key={dimension} className="mt-2">
                    {/* <Label htmlFor={dimension} className="capitalize">{dimension} Image</Label> */}
                    <Card className="overflow-hidden mt-2">
                      <CardContent className="p-0">
                        <div
                          className="h-28 flex items-center justify-center bg-secondary rounded-none text-secondary-foreground relative "
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            onDrop(Array.from(e.dataTransfer.files), 'modelImages', dimension);
                          }}
                        >
                          {formData.modelImages.find((img) => img.dimension === dimension) ? (
                            <>
                              <img
                                src={formData.modelImages.find((img) => img.dimension === dimension)?.preview}
                                alt={`${dimension} view`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => {
                                  const updatedModelImages = formData.modelImages.filter((img) => img.dimension !== dimension)
                                  updateFormData("modelImages", updatedModelImages)
                                }}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <div className="text-center ">
                              <p className="font-medium capitalize">{dimension} View</p>
                              <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files) {
                                onDrop(Array.from(e.target.files), 'modelImages', dimension);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        break;
      case 3:
        return (
          <div className="space-y-4 bg-red-400 p-6 flex flex-col lg:min-w-[600px] lg:max-w-[600px]">
            <div>
              <Label>Sizes</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-lg ${selectedSizes.includes(size)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                      }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Colors</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedColors.map((color, index) => (
                  <span
                    key={index}
                    style={{ backgroundColor: color }}
                    className="p-2 w-6 h-6 rounded-full"
                  ></span>
                ))}
              </div>
              <div className="flex items-center mt-4">
                <Input
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                />
                <Button onClick={handleAddColor} className="ml-2">
                  Add Color
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="200"
                value={formData.price}
                onChange={(e) => updateFormData("price", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="discountPrice">Discount Price</Label>
              <Input
                id="discountPrice"
                placeholder="180"
                value={formData.discountPrice}
                onChange={(e) => updateFormData("discountPrice", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                placeholder="100"
                value={formData.stockQuantity}
                onChange={(e) => updateFormData("stockQuantity", e.target.value)}
              />
            </div>
          </div>
        )
        break;
      case 4:
        // Step 4: Confirmation Step
        return (
          <div className="space-y-4">
            <CardHeader>
              <CardTitle>Confirm Your Data</CardTitle>
              <CardDescription>Please review your entered data below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Title:</strong> {formData.name}</p>
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Short Description:</strong> {formData.shortDescription}</p>
              <p><strong>Detailed Description:</strong> {formData.detailedDescription}</p>
              <p><strong>Price:</strong> {formData.price}</p>
              <p><strong>Discount Price:</strong> {formData.discountPrice}</p>
              <p><strong>Selected Sizes:</strong> {selectedSizes.join(", ")}</p>
              <p><strong>Selected Colors:</strong> {selectedColors.join(", ")}</p>
              <p><strong>Tags:</strong> {formData.tags.join(", ")}</p>
              {/* Add more fields as needed */}
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Confirm & Submit</Button>
            </CardFooter>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 bg-violet-500 top-0 left-0">
      {renderStep()}
      {step < 4 && (
        <div className="flex justify-between mt-4">
          {step >= 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          <Button onClick={nextStep}>
            {step === 3 ? "Confirm" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );

}

export default MultiStepProductForm
