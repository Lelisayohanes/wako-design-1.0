import React, { useState, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';

interface ImageFile {
  file: File;
  preview: string;
}

interface ModelImage extends ImageFile {
  dimension: 'front' | 'back' | 'right' | 'left';
}

interface ImageUploadProps {
  updateFormData: (field: string, value: File | File[] | ModelImage[] | null) => void; // Allow null
  mainImage: File | null;
  thumbnailImages: File[];
  modelImages: ModelImage[];
}

export default function ImageUpload({
  updateFormData,
  mainImage,
  thumbnailImages,
  modelImages,
}: ImageUploadProps) {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], field: string, dimension?: ModelImage['dimension']) => {
      if (acceptedFiles.length > 0) {
        if (field === 'mainImage') {
          const file = acceptedFiles[0];
          updateFormData(field, file);
          setMainImagePreview(URL.createObjectURL(file));
        } else if (field === 'thumbnailImages') {
          const newThumbnails = acceptedFiles.slice(0, 4 - thumbnailImages.length);
          updateFormData(field, [...thumbnailImages, ...newThumbnails]);
        } else if (field === 'modelImages' && dimension) {
          const newImage: ModelImage = {
            file: acceptedFiles[0],
            preview: URL.createObjectURL(acceptedFiles[0]),
            dimension,
          };
          const updatedModelImages = modelImages.filter(img => img.dimension !== dimension);
          updatedModelImages.push(newImage);
          updateFormData(field, updatedModelImages);
        }
      }
    },
    [updateFormData, thumbnailImages, modelImages]
  );

  const removeImage = (field: string, index?: number, dimension?: ModelImage['dimension']) => {
    if (field === 'mainImage') {
      updateFormData(field, null); // Pass null to indicate removal
      setMainImagePreview(null);
    } else if (field === 'thumbnailImages' && index !== undefined) {
      const newThumbnails = thumbnailImages.filter((_, i) => i !== index);
      updateFormData(field, newThumbnails);
    } else if (field === 'modelImages' && dimension) {
      const updatedModelImages = modelImages.filter(img => img.dimension !== dimension);
      updateFormData(field, updatedModelImages);
    }
  };

  const dimensions: ModelImage['dimension'][] = ['front', 'back', 'right', 'left'];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="mainImage">Main Image</Label>
        <Card className="mt-2">
          <CardContent className="p-0">
            <div
              className="h-40 flex items-center justify-center bg-secondary text-secondary-foreground relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(Array.from(e.dataTransfer.files), 'mainImage');
              }}
            >
              {mainImagePreview ? (
                <>
                  <img
                    src={mainImagePreview}
                    alt="Main product"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage('mainImage')}
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
                  className="h-40 flex items-center justify-center bg-secondary text-secondary-foreground relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onDrop(Array.from(e.dataTransfer.files), 'thumbnailImages');
                  }}
                >
                  {thumbnailImages[index] ? (
                    <>
                      <img
                        src={URL.createObjectURL(thumbnailImages[index])}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage('thumbnailImages', index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="font-medium">Thumbnail {index + 1}</p>
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        onDrop(Array.from(e.target.files), 'thumbnailImages');
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

      <div>
        <Label htmlFor="modelImages">Model Images (upload one image for each dimension)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {dimensions.map((dimension) => (
            <Card key={dimension} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="h-40 flex items-center justify-center bg-secondary text-secondary-foreground relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onDrop(Array.from(e.dataTransfer.files), 'modelImages', dimension);
                  }}
                >
                  {modelImages.find(img => img.dimension === dimension) ? (
                    <>
                      <img
                        src={modelImages.find(img => img.dimension === dimension)?.preview}
                        alt={`${dimension} view`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage('modelImages', undefined, dimension)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="font-medium capitalize">{dimension}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
