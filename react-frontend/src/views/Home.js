import React, { useEffect, useState } from 'react'

export default function Home( { addToCart } ) {

    const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await fetch(`http://localhost:5000/api/products`);
        const data = await res.json();
        if (data.status === 'ok') {
            setProducts(data.data)
        }
    };

    useEffect(() => {
        getProducts();
    },[])

  return (
    <div>
            {products.map(p =>
                <div key={p.prod_id} className="card text-decoration-none text-dark" style={{ width: '18rem' }}>
                    <img src={p.image} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{p.price}</h6>
                        <p className="card-text">{p.description}</p>
                        <button onClick={() => {addToCart(p)}} className='btn btn-primary' >Add to Cart</button>
                    </div>
                </div>


            )               
}
    </div>
  )
}
