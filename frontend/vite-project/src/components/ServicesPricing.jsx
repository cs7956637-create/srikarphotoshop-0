import React, { useState, useEffect } from 'react';
import API from '../api/axios';

// Static Fallback Data for UI testing / Backend Offline state
const localServices = [
  {
    _id: '1',
    title: 'Traditional Wedding',
    price: '75,000',
    description: 'Timeless photography and video coverage for grand traditional weddings.',
    features: [
      'Full Day Photography & 4K Video',
      '1 Premium Canvas Photobook (40 Pages)',
      'Edited Soft Copies (USB Drive)',
      'Drone Aerial Shots Included'
    ],
    isPopular: false
  },
  {
    _id: '2',
    title: 'Cinematic & Candid Suite',
    price: '1,35,000',
    description: 'Our most preferred luxury package for modern couples and grand films.',
    features: [
      'Candid Photography & Cinematography',
      'Teaser Reel (60-sec Instagram Reel)',
      'Full Length Wedding Film (4K)',
      '2 Flush-Mount Premium Albums',
      'Pre-Wedding Outdoor Shoot Included'
    ],
    isPopular: true
  },
  {
    _id: '3',
    title: 'Pre-Wedding & Portraits',
    price: '35,000',
    description: 'Creative couple sessions and event portraits with artistic color grading.',
    features: [
      '4-6 Hours Outdoor Session',
      'Color Graded High-Res Photos',
      'Short Cinematic Teaser Reel',
      '2 Custom Framed Canvas Prints'
    ],
    isPopular: false
  }
];

const ServicesPricing = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await API.get('/services');
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(localServices);
        }
      } catch (err) {
        console.error('Failed to load services from API, using local fallback', err);
        setServices(localServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-neutral-950 text-white px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] top-1/3 left-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Investment & Packages
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif gold-gradient-text mt-4">
            Services & Packages
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto">
            Tailored visual storytelling designed to preserve your most cherished milestones.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-neutral-500">Loading packages...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {services.map((service) => (
              <div
                key={service._id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  service.isPopular
                    ? 'bg-neutral-900/90 border-2 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.2)] md:-translate-y-4'
                    : 'bg-neutral-900/40 border border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                {/* Popular Badge */}
                {service.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Preferred
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-bold font-serif text-white">{service.title}</h3>
                  <p className="text-neutral-400 text-xs mt-2 mb-6 min-h-[36px]">{service.description}</p>
                  
                  <div className="mb-6 pb-6 border-b border-neutral-800">
                    <span className="text-3xl font-extrabold gold-gradient-text">₹{service.price}</span>
                    <span className="text-xs text-neutral-500 block mt-1">starting per event</span>
                  </div>

                  {/* Dynamic or Fallback Features rendering */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-neutral-300">
                          <svg
                            className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 ${
                    service.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02]'
                      : 'bg-neutral-800 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  Book Package
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPricing;