import React, { useState } from 'react';
import Categories from './Categories';
import Navbar from './Navbar'; 

const Category = () => {
    const [data, setData] = useState(Categories);
    const [searchInput, setSearchInput] = useState('');
    const [cart, setCart] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const addToCart = (item) => {
        const index = cart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart[index].quantity++;
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    };

    const incrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const decrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const handleFilterChange = (category) => {
        if (category === 'All') {
            setData(Categories); 
        } else {
            setData(Categories.filter(item => item.category.toLowerCase() === category.toLowerCase()));
        }
    };

    return (
        <>
            <Navbar cartItems={cart} removeFromCart={removeFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
            <h1 className="text-center text-info">Let's Shop</h1>
            <div className="container-fluid mx-2">
                <div className='row mt-4 mx-3'>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                        {['Men', 'Women', 'Children', 'Home Appliance', 'Footwear', 'Electronic Gadget'].map((category, index) => (
                            <button key={index} className='btn-warning w-100 mb-2' onClick={() => handleFilterChange(category)}>{category}</button>
                        ))}
                        <button className='btn-warning w-100 mb-4' onClick={() => handleFilterChange('All')}>All</button>
                    </div>
                    <div className="col-md-9">
                        <div className='row'>
                            {filteredData.map((item) => (
                                <div key={item.id} className='col-md-3 mb-4'>
                                    <div className="card">
                                        <img src={item.image} className="card-img-top" alt={item.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p>Price: Rs {item.price}</p>
                                            <button className="btn btn-dark" onClick={() => addToCart(item)}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-4 mx-3">
                    <div className="col-md-9">
                        <h2>Cart</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="mb-2">
                                <p>{item.title} - Rs {item.price} x {item.quantity}</p>
                                <button className="btn btn-sm btn-danger mr-2" onClick={() => decrementQuantity(item.id)}>-</button>
                                <button className="btn btn-sm btn-success" onClick={() => incrementQuantity(item.id)}>+</button>
                                <button className="btn btn-sm btn-danger ml-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3">
                        <h4>Total Price: Rs {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
