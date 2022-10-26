import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx'
import { FaSortDown, FaSortUp } from 'react-icons/fa';


export default function RelatedProductsList ({currentItem, setProduct}) {
  const [relatedItems, setRelatedItems] = useState([])
  const [show, setShow] = useState(false)


  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  const style = {
    display: show ? '' : 'none'
  }

  return (
    <>
      <h3 style={{cursor: 'pointer', borderBottom: '1px solid gray'}} onClick={() => setShow(!show)}>Related Products {show ? <FaSortUp /> : <FaSortDown />}</h3>
      <div className='related-list' style={style}>
        <ul className='related-ul'>
          {relatedItems.map(item => (
            <ProductCard currentItem={currentItem} setProduct={setProduct} key={item} item={item} list={'related'}/>
            ))
          }
        </ul>
        {relatedItems.length > 4 ?
          <ScrollButtons element={'.related-list .related-ul'} width={1100} scroll={275} />
          : null
        }
      </div>
    </>
  )
}