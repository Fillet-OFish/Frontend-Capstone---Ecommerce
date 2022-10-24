import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StarRatings({item}) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/reviews/${item}`, {cancelToken: source.token})
    .then((data) => {
      let rating = {};
      rating.count = data.data.count;
      let average = 0
      for (var i = 0; i < data.data.results.length; i++) {
        average += data.data.results[i].rating
        if (i === data.data.results.length - 1) {
          average = average / data.data.results.length
        }
      }
      rating.average = average;
      setRating(rating);
    })
    .catch(err => {console.log(err)})
  }, [])

  return (
    <div>
      {rating ?
        [...Array(5)].map((star, i) => {
          const starFill = () => {
            if (rating.average - i >= 1) {
              return 100
            }
            if (rating.average - i >= 0.75) {
              return 70
            }
            if (rating.average - i >= 0.50) {
              return 50
            }
            if (rating.average - i >= 0.25) {
              return 30
            }
            return 0
          }
          const style = {
            display: 'inline-block',
            background: `linear-gradient(90deg, #f80 ${starFill()}%, #ddd 0 ${100 - starFill()}%`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }
          return (
            <small key={i} style={style}>⭐</small>
            )
        }) : null}
    </div>
  )
}
