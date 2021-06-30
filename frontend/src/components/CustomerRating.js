import React from 'react'

const CustomerRating = ({ rating }) => {

    const color = rating >= 4 ? '#228B22' : rating >= 2 ? 'Orange' : '#db0000'

    return (
        <div className='rating'>
            
            <span style={{color , textShadow: '0px 1px, 1px 0px, 1px 1px'}}>{rating} </span>
            <span><i style={{color}} className={rating >=1 ? 'fas fa-star' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=2 ? 'fas fa-star' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=3 ? 'fas fa-star' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=4 ? 'fas fa-star' : 'far fa-star'}></i></span>
            <span><i style={{color}} className={rating >=5 ? 'fas fa-star' : 'far fa-star'}></i></span>
        </div>
    )
}

CustomerRating.defaultProps = { color: '#f8e825' }

export default CustomerRating
