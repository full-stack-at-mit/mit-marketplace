import React from 'react'

const ItemCard = () => {
  return (
    <div className='card' style="width: 18rem;">
        /* -- This is currently bootstrap code but we want to customize this later */
        <img class="card-img-top" src="..." alt="Card image cap" />
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  )
}

export default ItemCard