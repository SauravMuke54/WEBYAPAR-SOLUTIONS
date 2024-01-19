export const getCroppedImg = async (imageSrc, crop, originalFile) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
  
        // Convert the canvas content to a Blob
        canvas.toBlob((blob) => {
          // Create a new File object with the same name and type as the original file
          const croppedFile = new File([blob], originalFile.name, { type: blob.type });
  
          resolve(croppedFile);
        }, 'image/jpeg');
      };
    });
  };
  