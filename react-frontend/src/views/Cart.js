import React from 'react'

export default function Cart({ cart, removeFromCart }) {

    const getUniqueRow = (cart) => {
        let uniqueCart = [];
        let ids = new Set();
        for (let item of cart) {
            if (!ids.has(item.id)) {
                uniqueCart.push(item)
                ids.add(item.id)
            }
        }
        return uniqueCart
    };
    
    const getQuantity = (item, cart) => {
        let count = 0;
        for (let current of cart) {
            if (item.id === current.id) {
                count ++;
            }
        }
        return count
    }

    return (
        <table className='table table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th></th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
                <th>remove</th>
            </tr>
        </thead>
        <tbody>
            {getUniqueRow(cart).map((c,i) => <tr key={i}>
                <td>{c.id}</td>
                <td><img style={{height: '2rem'}} src={c.image}/></td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>{getQuantity(c, cart)}</td>
                <td>{(getQuantity(c, cart)*parseFloat(c.price)).toFixed(2)}</td>
                <td><button onClick={() => {removeFromCart(c)}} className='btn btn-danger'>Remove</button></td>
            </tr>)}
        </tbody>
    </table>
  )
}
