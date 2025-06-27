
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadFile, validateImageFile } from '@/utils/fileUpload';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  label = 'Upload Image',
  multiple = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      validateImageFile(file);
      
      const uploadedUrl = await uploadFile(file);
      onChange(uploadedUrl);
      
      toast({
        title: 'Success!',
        description: 'Image uploaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Upload Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {value ? (
          <div className="relative">
            <img src={value} alt="Preview" className="max-h-32 mx-auto rounded" />
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        multiple={multiple}
      />
    </div>
  );
};

export default ImageUpload;
