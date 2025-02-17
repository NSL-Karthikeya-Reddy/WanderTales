import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post('/image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add timeout and onUploadProgress for better user experience
      timeout: 30000, // 30 seconds timeout
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // You can use this progress value to show upload progress if needed
          console.log(`Upload Progress: ${progress}%`);
        }
      },
    });

    // Response now includes both imageUrl and imagePublicId from Cloudinary
    const { imageUrl, imagePublicId } = response.data;

    if (!imageUrl || !imagePublicId) {
      throw new Error('Invalid response from server');
    }

    return {
      url: imageUrl,
      publicId: imagePublicId,
    };

  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error
      console.error('Server Error:', error.response.data.message || 'Upload failed');
      throw new Error(error.response.data.message || 'Upload failed');
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error: No response received');
      throw new Error('Network error - please check your connection');
    } else {
      // Error in request setup
      console.error('Upload Error:', error.message);
      throw new Error(error.message || 'Failed to upload image');
    }
  }
};

// Helper function to delete image from Cloudinary
const deleteImage = async (imagePublicId) => {
  if (!imagePublicId) return;
  
  try {
    await axiosInstance.delete(`/delete-image?imagePublicId=${imagePublicId}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Optionally throw error if you want to handle it in the component
    throw new Error('Failed to delete image');
  }
};

export { uploadImage, deleteImage };