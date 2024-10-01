"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

type Product = {
    name: string;
    description: string;
    price: number;
    discount: number;
    mainImage: File | null;
    frontImage: File | null;
    backImage: File | null;
    leftImage: File | null;
    rightImage: File | null;
    modelImageOne: File | null;
    modelImageTwo: File | null;
    category: string;
}

type Category = {
    id: number;
    name: string;
}

export default function ProductForm() {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        mainImage: null,
        frontImage: null,
        backImage: null,
        leftImage: null,
        rightImage: null,
        modelImageOne: null,
        modelImageTwo: null,
        category: '',
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [dragging, setDragging] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/ecommerce/category/");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const target = e.target as HTMLInputElement;
        const files = target.files;

        setProduct((prev) => ({
            ...prev,
            [name]: type === 'file' ? (files && files[0] ? files[0] : null) : (name === 'price' || name === 'discount' ? parseFloat(value) : value),
        }));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, imageType: string) => {
        e.preventDefault();
        setDragging(imageType);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, imageType: string) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setProduct((prev) => ({
                ...prev,
                [imageType]: files[0],
            }));
        }
        setDragging(null);
    };

    const handleFileInputClick = (imageType: string) => {
        const input = document.getElementById(imageType) as HTMLInputElement;
        input?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', product.name);
        formDataToSubmit.append('description', product.description);
        formDataToSubmit.append('price', product.price.toString());
        formDataToSubmit.append('discount', product.discount.toString());
        formDataToSubmit.append('category', product.category ? product.category.toString() : '');

        const images = [
            { file: product.mainImage, type: 'main' },
            { file: product.frontImage, type: 'front' },
            { file: product.backImage, type: 'back' },
            { file: product.leftImage, type: 'left' },
            { file: product.rightImage, type: 'right' },
            { file: product.modelImageOne, type: 'modelOne' },
            { file: product.modelImageTwo, type: 'modelTwo' },
        ];

        images.forEach(image => {
            if (image.file) {
                formDataToSubmit.append('images', image.file);
                formDataToSubmit.append('image_type', image.type);
            }
        });

        try {
            const response = await fetch("http://127.0.0.1:8000/api/ecommerce/products/", {
                method: "POST",
                body: formDataToSubmit,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Success:", responseData);
            alert("Product submitted successfully!");
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("There was an error submitting the product. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" value={product.category} onValueChange={(value) => handleChange({ target: { name: 'category', value } } as any)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Pricing</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount</Label>
                                <Input
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    value={product.discount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Drag and Drop Zones for Images */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Product Images</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {['frontImage', 'backImage', 'leftImage', 'rightImage', 'mainImage', 'modelImageOne', 'modelImageTwo'].map((imageName) => (
                                <div
                                    key={imageName}
                                    className={`p-4 border-2 border-dashed rounded-lg ${dragging === imageName ? 'border-primary bg-gray-100' : 'border-gray-300'} cursor-pointer transition duration-300`}

                                    // Handle drag and drop
                                    onDragOver={(e) => handleDragOver(e, imageName)}
                                    onDrop={(e) => handleDrop(e, imageName)}
                                    
                                    // Handle click to upload
                                    onClick={() => handleFileInputClick(imageName)}
                                >
                                    <Label htmlFor={imageName} className="block text-sm font-medium">
                                        {imageName.replace(/([A-Z])/g, ' $1').trim()} {imageName === 'mainImage' ? '(Required)' : ''}
                                    </Label>
                                    <input
                                        type="file"
                                        id={imageName}
                                        name={imageName}
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className="text-center mt-2 text-gray-500">
                                        {product[imageName as keyof Product] ? (
                                            <p>{(product[imageName as keyof Product] as File).name}</p>
                                        ) : (
                                            <p>Drag & Drop or Click to Upload</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="mt-4">Submit Product</Button>
                </CardContent>
            </Card>
        </form>
    );
}
