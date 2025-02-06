import React from "react";

import css from './LandingPage.css'

import logo from '../../../asset/images/logo.png';
import shoppingCart from '../../../asset/images/logo.png';
import avartar from '../../../asset/images/profile_photo.png';

const LandingPage = () => {

    return (
        <div className='navigationBar'>
            <div className="logo">
                <div className="">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
            <div>
                <div className="cart-button">
                    <button>
                        <div className="shopping-cart">
                            <span>Shopping_cart</span>
                            <span className="button_badge">30</span>
                        </div>
                    </button>

                </div>
                <div className="flex py-4">
                    <button type="button" className="icon_button"> 
                        <span className="material-icons text-gray-200">Chat</span>
                        <span className="icon-button_badge">1</span>
                    </button>
                </div>
                <div className="flex py-4">
                    <button type="button" className="icon_button"> 
                        <span className="material-icons text-gray-200">Notifications</span>
                        <span className="icon-button_badge">1</span>
                    </button>
                </div>
                <div className="avartar">
                    <button >
                        <img src={avartar} alt="avartar" />
                    </button>

                </div>
                <div className="sell">
                    <button>SELL</button>
                </div>

            </div>
            <h1>Welcome to landing page</h1>
        </div>
    )
}
export default LandingPage;