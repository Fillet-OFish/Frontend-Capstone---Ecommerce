import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './components/Styles.jsx'
import Gallery from './components/Gallery.jsx'
import Cart from './components/Cart.jsx'

export default function Overview({product, rating}) {
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])
  const [noDefault, setNoDefault] = useState(false)

  // on load/product change, set styles/style based on default product/new product
  useEffect(() => {
    if(product && product.length!==0){
      if(product.id!==null) {
        axios.get(`/api/products/${product.id}/styles`)
        .then(result => {
          setStyles(result.data.results);
          setStyle(result.data.results[0])
          return result.data.results[0]
        })
        .then(style => {if(style['default?']===false){setNoDefault(true)}})
      }
    }
  },[product])

  return(
    <>
        {/* Gallery */}
        <Gallery style={style} noDefault={noDefault}/>

        <div className="right">
          {/* Stars */}
          <p>★★★★☆ <a href="/">Read all reviews</a></p>

          {/* Category */}
          <p className="product-category">UNISEX / {product.category} / {product.name}</p>

          {/* Product name (dependent on if a default style exists) */}
          <div className="product-name">
            {noDefault ? <><p className="coming-soon">COMING SOON:</p><p className="product-name-null">{product.name}</p></> : product.name}
          </div>

          {/* price (dependent on sale price) */}
          <p className="price">{style.sale_price ? (<><span style={{textDecoration: 'line-through', textDecorationThickness:'2px', textDecorationColor:'black',color:'gray'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

          {/* Styles */}
          <Styles styles={styles} style={style} setStyle={setStyle} noDefault={noDefault}/>

          {/* Cart */}
          <Cart style={style}/>
        </div>
    </>
  )
}