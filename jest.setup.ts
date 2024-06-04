import '@testing-library/jest-dom';

// jest.setup.js
Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn().mockReturnValue([]),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn().mockReturnValue({ width: 0 }),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    }),
  });
  
// Mock the Image constructor
(globalThis as any).Image = class {
    onload: () => void = () => {};
  
    constructor() {
      setTimeout(() => {
        this.onload();
      }, 100); // Simulate async image loading
    }
  
    set src(_: string) {
      setTimeout(() => {
        this.onload();
      }, 100); // Simulate async image loading
    }
  };