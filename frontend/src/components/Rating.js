import React from 'react'

const Rating = ({ rating , numReviews}) => {

    const color = rating >= 4 ? '#228B22' : rating >= 2 ? 'Orange' : rating !== 0 ? '#db0000' : 'Gray'

    const ratingNumber = Number(Number(rating).toFixed(0)).toFixed(1) === Number(rating).toFixed(1) ?
                         Number(rating).toFixed(0) : Number(rating).toFixed(1)

    return (
        <div className='rating'>
            
            <span style={{color , textShadow: '0px 1px, 1px 0px, 1px 1px'}}>{ratingNumber} </span>
            <span><i style={{color}} className={rating >=1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=4 ? 'fas fa-star' : rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i></span>
            <span style={{color:'Gray' , fontWeight: 'bold'}}>{` (${numReviews} reviews)`}</span>

        </div>
    )
}

Rating.defaultProps = { color: '#f8e825' }

export default Rating
