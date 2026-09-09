import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState('');

  // Enhanced helper function with autoplay & mute parameters
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1]?.split('?')[0];
    } else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1]?.split('?')[0];
    }

    // ?autoplay=1&mute=1&loop=1&playlist=videoId (loop kooda avthundi కావాలంటే)
    return videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1` 
      : url;
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get('/video');
        if (res.data && res.data.youtubeUrl) {
          setVideoUrl(getEmbedUrl(res.data.youtubeUrl));
        }
      } catch (err) {
        console.error('Failed to load featured video', err);
      }
    };
    fetchVideo();
  }, []);

  if (!videoUrl) return null;

  return (
    <section className="py-20 bg-neutral-950 text-white text-center px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          Cinematic Work
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-amber-500">
          Watch Our Latest Creation
        </h2>
        
        {/* Responsive YouTube Iframe with autoplay & mute */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
          <iframe
            src={videoUrl}
            title="Srikar Studio Featured Video"
            className="w-full h-full absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;