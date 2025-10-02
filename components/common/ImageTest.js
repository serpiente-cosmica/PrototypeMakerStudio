import { useState } from "react";

/**
 * Componente de prueba para verificar la carga de imágenes
 */
const ImageTest = ({ src, alt = "Test Image" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleError = (e) => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {imageError ? (
        <div className="text-center text-red-500 text-xs">
          <p>❌ Failed to load</p>
          <p className="break-all text-xs">{src}</p>
        </div>
      ) : imageLoaded ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div className="text-center text-gray-500 text-xs">
          <p>⏳ Loading...</p>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain opacity-0"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
    </div>
  );
};

export default ImageTest;
