import React, { useState } from 'react';
import '../stylecss/Rating.css'
import axios from 'axios';
const Rating = (props) => {
  const [rating, setRating] = useState(null);

  const handleRatingClick = async(value) => {
    setRating(value);
    try{
        const {data} = await axios.put('http://localhost:4000/api/v1/auth/user-rating',{rate:value,postId:props.postId});
        console.log(data);
    }
    catch(error){
        console.log(error)
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleRatingClick(value)}
          className={`star ${value <= rating ? 'active' : ''}`}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};

export default Rating;
