import React, { useState, useEffect, createContext } from 'react';
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';
import Social from './components/Social.jsx'
import Styles from './components/Styles.jsx'
import Gallery from './components/gallery/Gallery.jsx'
import Cart from './components/Cart.jsx'

export default function Overview({product, rating, numReviews}) {
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])
  const [photos, setPhotos] = useState([])

  // on load/product change, set styles/style based on default product/new product
  useEffect(() => {
    if(product.id){
      axios.get(`/api/products/${product.id}/styles`)
      .then(result => {
        setStyles(result.data.results);
        setStyle(result.data.results[0])
        setPhotos(result.data.results[0].photos)
        return result.data.results[0]
      })
    }
  },[product])

  return(
    <>
        {/* Gallery */}
        {style && photos ? <Gallery style={style} photos={photos} setPhotos={setPhotos}/> : null }

        <div className="right">
          {/* Stars */}
          <p>
            <Rating
              size={15}
              initialValue={rating}
              allowFraction={true}
              fillColor={'#000000'}
              style={{pointerEvents: 'none'}}
            />
            &nbsp; {numReviews ? <a href="/">Read all {numReviews} reviews</a> : null}
          </p>

          {/* Social media */}
          {<Social product={product} style={style} photos={photos}/>}

          {/* Social media */}
          <Social product={product}/>

          {/* Category */}
          <p className="product-category">UNISEX / {product.category} / {product.name}</p>

          {/* Product name (dependent on if a default style exists) */}
          <div className="product-name">
            {style.photos && !style.photos[0].thumbnail_url ? <><p className="coming-soon">COMING SOON:</p><p className="product-name-null">{product.name}</p></> : product.name}
          </div>

          {/* Price (dependent on sale price) */}
          <p className="price">{style.sale_price ? (<><span style={{textDecoration: 'line-through', textDecorationThickness:'2px', textDecorationColor:'black',color:'gray'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

          {/* Styles */}
          <Styles styles={styles} style={style} setStyle={setStyle} />

          {/* Cart */}
          <Cart style={style}/>
        </div>
    </>
  )
}