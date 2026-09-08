import React, { useState, useEffect } from 'react';
import API from '../api/axios';

// Local images fallback list for initial look
const localPhotos = [
  {
    _id: '1',
    title: 'Wedding Photography',
    category: 'Wedding',
    imageUrl: '/images/wedding.png'
  },
  {
    _id: '2',
    title: 'Cinematic Portrait',
    category: 'Portrait',
    imageUrl: '/images/portrait.jpg'
  },
  {
    _id: '3',
    title: 'Event Highlights',
    category: 'Event',
    imageUrl: '/images/event.jpeg'
  }
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await API.get('/gallery');
        // DB lo photos unte avi chupisthundi, lekapothe local photos load chestundi
        if (data && data.length > 0) {
          setPhotos(data);
        } else {
          setPhotos(localPhotos);
        }
      } catch (err) {
        // Backend offline unna static images thote run avthundi
        setPhotos(localPhotos);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-20 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif gold-gradient-text mt-4">
            Our Gallery
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto">
            Capturing timeless memories with cinematic precision.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-neutral-500">Loading portfolio...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="h-72 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Image missing unte fallback placeholder logic
                      e.target.src = 'https://via.placeholder.com/600x400/171717/f59e0b?text=Srikar+Photo+Studio';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                    {item.category || 'Photography'}
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;