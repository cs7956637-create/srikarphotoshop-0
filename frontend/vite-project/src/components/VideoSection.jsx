import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState('');

  // YouTube URL ni embed format loki marchadaniki helper function
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
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

  if (!videoUrl) return null; // Video లేకపోతే సెక్షన్ అసలు కనబడదు

  return (
    <section className="py-20 bg-neutral-950 text-white text-center px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          Cinematic Work
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-amber-500">
          Watch Our Latest Creation
        </h2>
        
        {/* Responsive YouTube Iframe */}
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