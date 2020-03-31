import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Order Your sandwitch</h1>
            </header>
            <div className='sandwitch_order'>
                <div className='order'>
                    <h3 className='title'>Sandwitch A</h3>
                    <p className='details'>Details</p>
                    <p className='topings'>Topings</p>
                    <button className='order_button'>Order</button>
                </div>
                <div className='order'>
                    <h3 className='title'>Sandwitch B</h3>
                    <p className='details'>Details</p>
                    <p className='topings'>Topings</p>
                    <button className='order_button'>Order</button>
                </div>
                <div className='order'>
                    <h3 className='title'>Sandwitch C</h3>
                    <p className='details'>Details</p>
                    <p className='topings'>Topings</p>
                    <button className='order_button'>Order</button>
                </div>
                <div className='order'>
                    <h3 className='title'>Sandwitch D</h3>
                    <p className='details'>Details</p>
                    <p className='topings'>Topings</p>
                    <button className='order_button'>Order</button>
                </div>
            </div>
        </div>
    );
}

export default App;
