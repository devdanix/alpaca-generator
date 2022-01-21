
import React, { useState } from 'react'
import data from './alpaca-options.json'
import { FaRandom } from 'react-icons/fa'
import domtoimage from "dom-to-image-more";

import Alpaca from './components/Alpaca.jsx';


export default function App() {

  const defaultAlpaca = {
    Accessories:'headphone',
    Backgrounds:'blue50',
    Ears:'default',
    Eyes:'default',
    Hair:'default',
    Leg:'default',
    Mouth:'default',
    Neck:'default',
    Nose:'nose',
  }

  const [ categorySelected, setCategorySelected ] = useState('Hair')
  const [ clicks, setClicks ] = useState(0)
  const [ newDesign, setNewDesign ] = useState(defaultAlpaca)

  const mainCategories = Object.keys(data)
  let subCategories = categorySelected ? Object.values(data[categorySelected]) : []

  const toggleButtonActive = (e, activeClass) => {

    let element = e.target;

    if(document.getElementsByClassName(activeClass).length > 0) {
      document.getElementsByClassName(activeClass)[0].classList.remove(activeClass)
    }
    if(document.getElementsByClassName('active-subcategory').length > 0) {
      document.getElementsByClassName('active-subcategory')[0].classList.remove('active-subcategory')
    }
    element.classList.add(activeClass);
  }

  const randomAlpaca = () => {
    mainCategories.map((category, index) => {
      let subCat = data[category].length
      let indexToGet = Math.floor(Math.random() * subCat);
      newDesign[category] = data[category][indexToGet]
      return newDesign
    })
    setClicks(clicks + 1)
  }

  const downloadAlpaca = () => {
    let alpacaDesign = document.getElementById('alpaca-design')
    domtoimage
    .toJpeg(alpacaDesign, { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-alpaca.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <>
    <h1 className='title'>Alpaca Generator</h1>
    <div className="wrapper">
      <Alpaca design={newDesign} />
      <div className='button-container'>
        <p className='button-titles'>Accessorize the Alpaca's</p>
        <div className="mb">
          {
            mainCategories.map((category, index) => {
              return (
                <button className="button" key={index} onClick={(e) => {
                  setCategorySelected(category)
                  toggleButtonActive(e, 'active-category')
                }}>{category}</button>
              )
            })
          }
        </div>
        <p className='button-titles'>Style</p>
        <div>
        {
          subCategories ?
          subCategories.map((category, index) => {
            return (
              <button className="button" key={index} onClick={(e) => {
                newDesign[categorySelected] = category
                setNewDesign(newDesign)
                toggleButtonActive(e, 'active-subcategory')
                setClicks(clicks + 1)
              }}>
                {category}
              </button>
            )
          }):
          ''
        }
        </div>
      </div>
      <div className='action-buttons-wrapper'>
        <button className="button action-button" onClick={() => randomAlpaca()}>
          <FaRandom className=""/>
          <span className='action-button-title'>Random</span>
        </button>
        <button className="button action-button" onClick={() => downloadAlpaca()}>
          <FaRandom />
          <span className='action-button-title'>Download</span>
        </button>
      </div>

    </div>
    </>
  )
}
