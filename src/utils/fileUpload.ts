
export const uploadFile = async (file: File): Promise<string> => {
  // In a real application, this would upload to a cloud service like AWS S3, Cloudinary, etc.
  // For this demo, we'll create a blob URL that simulates uploaded file
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // In production, replace this with actual upload logic
      const result = reader.result as string;
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (JPG, PNG, WEBP)');
  }
  
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }
  
  return true;
};
