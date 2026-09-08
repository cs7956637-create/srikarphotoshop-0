import React from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import About from '../components/About';
import ServicesPricing from '../components/ServicesPricing';
import Gallery from '../components/Gallery';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <Navbar />
      <HeroSlider />
      <About />
      <ServicesPricing />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;