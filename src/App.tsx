import React from 'react'
import './App.css'
import { ImageSlider } from './components/'
import { images } from './images';

function App() {

  return (
    <>
      <h1>Image Slider </h1>
      <div className="card">
        <ImageSlider images={images}></ImageSlider>
      </div>
    </>
  )
}

export default App
