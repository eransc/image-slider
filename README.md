# ImageSlider Project

## Introduction

The ImageSlider project is a React-based application based on vite with local web server that displays an image slider which is expecting images array as an input. 
It supports images hosted locally or externally on the web.

The images are exposed by the images module and you need to specify which images should be included in the slider. 
The slider is using one canvas at all times, and is rendering different pair of images upon navigation.

## Prerequisites

Before running the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed on your machine. You can download it from the official website.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/eransc/image-slider.git

2. **Navigate to project direcotry:**
   cd image-slider

3. **Install dependencies:**
   npm install

# Using Your Own Images

You can use your own images with the ImageSlider project. Follow these steps to use local or external images:

# Using Local Images

1. **Place your images in the public/images directory:**
```project-root/
├── public/
│   ├── images/
│   │   ├── your-image1.jpg
│   │   ├── your-image2.jpg
│   │   └── ...

2. **Update the images.ts file in the src directory to include your images:**
```export const images = [
  '/images/your-image1.jpg',
  '/images/your-image2.jpg',
  // Add paths to your images here
];

# Using External Images
1. **Update the image.ts file **

# Running the project

After updating the images, run npm run dev