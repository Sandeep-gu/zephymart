import React from 'react'
import '../stylecss/About.css'
import Layout from '../components/Layout/Layout'
function About() {
  return (
    <div>
        <Layout title={"about"}>
            <h1>About ZephyMart</h1>
            <p>Welcome to zephymart, your one-stop destination for sustainable and eco-friendly products. We're dedicated to providing you with a wide range of environmentally conscious options, from organic clothing to eco-friendly home goods.</p>
            <h1>Our Mission</h1>
            <p>At EcoMart, we believe in the power of conscious consumerism. Our mission is to make sustainable living accessible and convenient for everyone. We strive to reduce our environmental impact and promote ethical production practices.</p>
            <h1>Our Journey</h1>
            <p>Since our founding in 2010, Nature Explorers has been dedicated to providing unforgettable experiences in the great outdoors. Over the years, we've organized numerous expeditions, educational programs, and community events that have left a positive impact on both participants and the environment.</p>
            
        </Layout>
    </div>
  )
}

export default About