import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const staticSliderImages = [
  {
    url: '/images/hero-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1920&auto=format&fit=crop',
    title: 'Capturing Life’s Timeless Moments',
    subtitle: 'High-end wedding cinematography and portraiture across Andhra Pradesh.'
  },
  {
    url: '/images/hero-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop',
    title: 'Cinematic Visual Storytelling',
    subtitle: 'Crafting luxury memories with state-of-the-art camera techniques.'
  },
  {
    url: '/images/hero-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920&auto=format&fit=crop',
    title: 'Unforgettable Portrait Experiences',
    subtitle: 'Professional studio shoots tailored for couples, brides, and events.'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState(staticSliderImages);

  // Fetch Live Admin Offer Banners and prepend/combine them into the slider
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await API.get('/offers');
        if (data && data.length > 0) {
          // Map admin offers to match slider structure using Cloudinary imageUrl
          const mappedBanners = data.map(banner => ({
            url: banner.imageUrl,
            fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop',
            title: banner.title,
            subtitle: banner.description
          }));
          // Combine admin banners first, then static images (or just use mappedBanners)
          setSliderImages([...mappedBanners, ...staticSliderImages]);
        }
      } catch (err) {
        console.error('Failed to load offer banners', err);
      }
    };
    fetchBanners();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section className="relative h-screen w-full bg-neutral-950 text-white flex items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Sliding Images Container */}
      <div 
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out z-0"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImages.map((slide, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.url}
              alt={`Srikar Photo Studio Hero Slide ${idx + 1}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src = slide.fallback;
              }}
            />
            {/* Dark Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/80"></div>
            <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Decorative Gold Ambient Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl space-y-6 pt-16">
        
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-500/10 px-5 py-2 rounded-full border border-amber-500/20 backdrop-blur-md">
          Srikar Photo Studio • Rajampet
        </span>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight gold-gradient-text font-serif drop-shadow-2xl transition-all duration-500">
          {sliderImages[currentIndex]?.title}
        </h1>

        <p className="text-base md:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow transition-all duration-500">
          {sliderImages[currentIndex]?.subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 text-sm"
          >
            Book Your Shoot
          </a>
          <a
            href="#gallery"
            className="w-full sm:w-auto bg-neutral-900/80 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-bold py-3.5 px-8 rounded-full transition-all duration-300 backdrop-blur-md text-sm"
          >
            Explore Gallery
          </a>
        </div>
      </div>

      {/* Manual Left/Right Nav Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-900/60 border border-neutral-700/60 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300 backdrop-blur-md"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-900/60 border border-neutral-700/60 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300 backdrop-blur-md"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* Bottom Slider Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-neutral-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;