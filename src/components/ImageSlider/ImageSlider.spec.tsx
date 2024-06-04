import { render, screen, waitFor } from '@testing-library/react';
import ImageSlider from './ImageSlider';
import { images } from '../../images';

describe('Test image slider behavior', () => {
    test('renders ImageSlider', () => {
        render(<ImageSlider images={images}/>);
        const imageSlider = screen.getByTestId('image-slider');
        expect(imageSlider).toBeInTheDocument();
    });

    xtest('renders first image on canvas', async () => {
        render(<ImageSlider images={images} />);
        const canvas = screen.getByTestId('image-slider') as HTMLCanvasElement;
    
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Canvas context is null');
        }
    
        // Wait for the image to load and the drawImage method to be called
        await waitFor(() => {
          expect(context.drawImage).toHaveBeenCalled();
        });
    
        // Additional checks to verify drawImage was called with the correct parameters
        const firstImage = new Image();
        firstImage.src = images[0];
        firstImage.onload = () => {
          expect(context.drawImage).toHaveBeenCalledWith(
            firstImage, // image element
            expect.any(Number), // x position (calculated in drawImages)
            expect.any(Number), // y position (calculated in drawImages)
            expect.any(Number), // width (calculated in drawImages)
            expect.any(Number)  // height (calculated in drawImages)
          );
        };
      });
});

