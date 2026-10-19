import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laboriosam unde repudiandae laborum, labore quas qui eius dolore, consequatur, quae ipsum ut quis laudantium vitae necessitatibus rem provident? Dolorum, hic.</p>
                      <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                      </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policay</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91- 1234567890</li>
                        <li>contactxyz@.com</li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className='Footer-copyright'>Copyright 2026 @ .com -All Right Reserved.</p>
        </div>
    )
}

export default Footer
