import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pricing');

  // Service Pricing State
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({ title: '', price: '', description: '', features: '', isPopular: false });

  // Banner State
  const [banners, setBanners] = useState([]);
  const [bannerForm, setBannerForm] = useState({ title: '', description: '', image: null });

  // Gallery State
  // Gallery State
const [gallery, setGallery] = useState([]);
const [galleryForm, setGalleryForm] = useState({ title: '', category: '', image: null });

  // Enquiries State
  const [enquiries, setEnquiries] = useState([]);

  // Fetch Data on Tab Change
  useEffect(() => {
    if (activeTab === 'pricing') fetchServices();
    if (activeTab === 'banners') fetchBanners();
    if (activeTab === 'gallery') fetchGallery();
    if (activeTab === 'enquiries') fetchEnquiries();
  }, [activeTab]);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      setServices(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchBanners = async () => {
    try {
      const res = await API.get('/offers');
      setBanners(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchGallery = async () => {
    try {
      const res = await API.get('/gallery');
      setGallery(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchEnquiries = async () => {
    try {
      const res = await API.get('/enquiries');
      setEnquiries(res.data || []);
    } catch (err) { console.error(err); }
  };

  // Handlers for Services
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...serviceForm, features: serviceForm.features.split(',').map(f => f.trim()) };
      await API.post('/services', payload);
      setServiceForm({ title: '', price: '', description: '', features: '', isPopular: false });
      fetchServices();
    } catch (err) { console.error(err); }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Delete service?')) {
      await API.delete(`/services/${id}`);
      fetchServices();
    }
  };

  // Handlers for Banners
const handleAddBanner = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', bannerForm.title);
    data.append('description', bannerForm.description);
    if (bannerForm.image) data.append('image', bannerForm.image);

    try {
      await API.post('/offers', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setBannerForm({ title: '', description: '', image: null });
      fetchBanners();
      alert('Banner uploaded successfully!');
    } catch (err) {
      console.error(err);
      // Ekkada error vastundo browser pop-up lo clear ga chupisthundi
      alert('Error uploading banner: ' + (err.response?.data?.message || err.response?.data?.error || err.message));
    }
  };
  const handleAddGallery = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('title', galleryForm.title);
  data.append('category', galleryForm.category);
  if (galleryForm.image) data.append('image', galleryForm.image);

  try {
    await API.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    setGalleryForm({ title: '', category: '', image: null });
    fetchGallery();
    alert('Gallery photo uploaded successfully!');
  } catch (err) {
    console.error(err);
    alert('Error uploading photo: ' + (err.response?.data?.message || err.response?.data?.error || err.message));
  }
};

const handleDeleteGallery = async (id) => {
  if (window.confirm('Delete this gallery photo?')) {
    try {
      await API.delete(`/gallery/${id}`);
      setGallery(gallery.filter(g => g._id !== id));
    } catch (err) {
      console.error("Failed to delete gallery photo", err);
    }
  }
};
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6">
        <h2 className="text-xl font-bold font-serif text-amber-500 mb-8">Srikar Studio Admin</h2>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'pricing' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            💲 Manage Pricing
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'banners' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            🏷️ Offer Banners
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'gallery' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            🖼️ Gallery Photos
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'enquiries' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}
          >
            ✉️ Customer Enquiries
          </button>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'pricing' && (
          <div>
            <h1 className="text-2xl font-bold text-amber-500 mb-6">Live Service Pricing</h1>
            <form onSubmit={handleAddService} className="bg-neutral-900 p-6 rounded-2xl mb-8 space-y-4 max-w-2xl">
              <input type="text" placeholder="Package Title" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} required className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <input type="text" placeholder="Price (e.g. 75,000)" value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: e.target.value})} required className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <textarea placeholder="Description" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <input type="text" placeholder="Features (comma-separated)" value={serviceForm.features} onChange={e => setServiceForm({...serviceForm, features: e.target.value})} className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <button type="submit" className="bg-amber-500 text-black px-6 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer">Add Package</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s._id} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-amber-400">{s.title}</h3>
                    <p className="text-sm font-semibold">₹{s.price}</p>
                  </div>
                  <button onClick={() => handleDeleteService(s._id)} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-xs cursor-pointer">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div>
            <h1 className="text-2xl font-bold text-amber-500 mb-6">Offer Banners</h1>
            <form onSubmit={handleAddBanner} className="bg-neutral-900 p-6 rounded-2xl mb-8 space-y-4 max-w-2xl">
              <input type="text" placeholder="Banner Title" value={bannerForm.title} onChange={e => setBannerForm({...bannerForm, title: e.target.value})} required className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <input type="text" placeholder="Offer Details" value={bannerForm.description} onChange={e => setBannerForm({...bannerForm, description: e.target.value})} className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm" />
              <input type="file" onChange={e => setBannerForm({...bannerForm, image: e.target.files[0]})} required className="text-sm text-neutral-400" />
              <button type="submit" className="bg-amber-500 text-black px-6 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer">Upload Banner</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map(b => (
                <div key={b._id} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                  <p className="font-bold text-amber-400">{b.title}</p>
                  <p className="text-xs text-neutral-400">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

       {activeTab === 'gallery' && (
  <div>
    <h1 className="text-2xl font-bold text-amber-500 mb-6">Gallery Photos</h1>
    
    {/* Gallery Upload Form */}
    <form onSubmit={handleAddGallery} className="bg-neutral-900 p-6 rounded-2xl mb-8 space-y-4 max-w-2xl border border-neutral-800">
      <input 
        type="text" 
        placeholder="Photo Title (e.g. Traditional Wedding)" 
        value={galleryForm.title} 
        onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} 
        required 
        className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm text-white" 
      />
      <input 
        type="text" 
        placeholder="Category (e.g. Wedding, Baby, Pre-Wedding)" 
        value={galleryForm.category} 
        onChange={e => setGalleryForm({...galleryForm, category: e.target.value})} 
        required 
        className="w-full bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-sm text-white" 
      />
      <input 
        type="file" 
        onChange={e => setGalleryForm({...galleryForm, image: e.target.files[0]})} 
        required 
        className="text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 cursor-pointer" 
      />
      <button type="submit" className="bg-amber-500 text-black px-6 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer">Upload Photo</button>
    </form>

    {/* Gallery Grid Display */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {gallery.map(item => (
        <div key={item._id} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
          <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-xl" />
          <div>
            <h3 className="font-bold text-amber-400">{item.title}</h3>
            <p className="text-xs text-neutral-400">Category: {item.category}</p>
          </div>
          <button 
            onClick={() => handleDeleteGallery(item._id)} 
            className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
          >
            Delete Photo
          </button>
        </div>
      ))}
    </div>
  </div>
)}

        {activeTab === 'enquiries' && (
          <div>
            <h1 className="text-2xl font-bold text-amber-500 mb-6">Customer Enquiries</h1>
            
            {enquiries.length === 0 ? (
              <p className="text-neutral-400 text-sm bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                No customer enquiries received yet.
              </p>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq._id} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-amber-400 text-base">{enq.name}</h3>
                        <p className="text-xs text-neutral-400">Phone: <a href={`tel:${enq.phone}`} className="text-amber-300 font-semibold">{enq.phone}</a> | Email: {enq.email || 'N/A'}</p>
                      </div>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                        {enq.service}
                      </span>
                    </div>

                    <div className="text-sm text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800/60">
                      <p><strong className="text-neutral-400">Target Date:</strong> {enq.date}</p>
                      {enq.message && <p className="mt-1"><strong className="text-neutral-400">Message:</strong> {enq.message}</p>}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-neutral-500">
                        Received on: {new Date(enq.createdAt).toLocaleString()}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {/* WhatsApp Chat Button */}
                        <a
                          href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(enq.name)},%20Thank%20you%20for%20reaching%20out%20to%20Srikar%20Studio%20regarding%20your%20${encodeURIComponent(enq.service)}%20booking%20on%20${enq.date}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                        >
                          💬 WhatsApp
                        </a>

                        {/* Delete Button */}
                        <button
                          onClick={async () => {
                            if (window.confirm('Delete this enquiry?')) {
                              try {
                                await API.delete(`/enquiries/${enq._id}`);
                                setEnquiries(enquiries.filter(e => e._id !== enq._id));
                              } catch (err) {
                                console.error("Failed to delete enquiry", err);
                              }
                            }
                          }}
                          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                        >
                          Delete Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;