import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  images: string[];
  dataTestId?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, dataTestId = 'image-slider' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialTranslateX, setInitialTranslateX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const bufferContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageElements = useRef<(HTMLImageElement | undefined)[]>(new Array(images.length));
  const [currentIndex, setCurrentIndex] = useState(0);

  const drawImages = useCallback((translate: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const bufferContext = bufferContextRef.current;
    if (!context || !canvas || !bufferContext) return;

    bufferContext.clearRect(0, 0, canvas.width, canvas.height);

    const img1 = imageElements.current[currentIndex];
    const img2 = currentIndex + 1 < images.length ? imageElements.current[currentIndex + 1] : undefined;

    const drawImage = (img: HTMLImageElement, x: number, y: number, width: number, height: number) => {
      bufferContext.fillStyle = '#ffffff'; // Background wrapper color
      bufferContext.fillRect(x, 0, canvas.width, canvas.height);
      bufferContext.drawImage(img, x + (canvas.width - width) / 2, y, width, height);
    };

    if (img1) {
      const scale1 = Math.min(canvas.width / img1.width, canvas.height / img1.height);
      const img1Width = img1.width * scale1;
      const img1Height = img1.height * scale1;
      const yPos1 = (canvas.height - img1Height) / 2; // Center the image vertically
      drawImage(img1, translate, yPos1, img1Width, img1Height);
    }

    if (img2 && translate < canvas.width * (currentIndex + 1)) {
      const scale2 = Math.min(canvas.width / img2.width, canvas.height / img2.height);
      const img2Width = img2.width * scale2;
      const img2Height = img2.height * scale2;
      const yPos2 = (canvas.height - img2Height) / 2; // Center the image vertically
      drawImage(img2, canvas.width + translate, yPos2, img2Width, img2Height);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bufferCanvasRef.current, 0, 0);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      contextRef.current = canvas.getContext('2d');
    }

    const bufferCanvas = bufferCanvasRef.current;
    bufferCanvas.width = 640;
    bufferCanvas.height = 400;
    bufferContextRef.current = bufferCanvas.getContext('2d');

    const loadImages = async () => {
      await Promise.all(images.map((src, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            imageElements.current[index] = img;
            if (index === 0) {
              drawImages(0); // Draw initial image once it loads
            }
            resolve();
          };
          img.onerror = reject;
          img.src = src;
        });
      }));
    };
    loadImages().catch(error => {
      console.error('Error loading images:', error);
    });
  }, [images, drawImages]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    const movementX = event.clientX - startX;

    let newTranslateX = (currentIndex === 0 && initialTranslateX + movementX > 0) ? 0 : initialTranslateX + movementX;

    const canvasWidth = canvasRef.current?.width ?? 0;
    if ((currentIndex === 0 && newTranslateX > 0) ||
        (currentIndex === images.length - 2 && newTranslateX < -canvasWidth)) {
      return;
    }

    // Calculate new index based on drag position
    let newIndex = currentIndex;
    if (newTranslateX < -canvasWidth && currentIndex < images.length - 1) {
      newIndex = currentIndex + 1;
      newTranslateX += canvasWidth;
      setStartX(event.clientX); // Reset start position to avoid jumpy dragging
      setInitialTranslateX(newTranslateX); // Reset initialTranslateX for smooth transition
    } else if (newTranslateX > 0 && currentIndex > 0) {
      newIndex = currentIndex - 1;
      newTranslateX -= canvasWidth;
      setStartX(event.clientX); // Reset start position to avoid jumpy dragging
      setInitialTranslateX(newTranslateX); // Reset initialTranslateX for smooth transition
    }

    setTranslateX(newTranslateX);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    drawImages(newTranslateX);
  }, [isDragging, startX, initialTranslateX, currentIndex, images.length, drawImages]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    setStartX(event.clientX);
    setInitialTranslateX(translateX);
    setIsDragging(true);
  }, [translateX]);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        style={{ background: '#f0f0f0', cursor: isDragging ? 'grabbing' : 'grab' }}
        data-testid={dataTestId}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageSlider;
