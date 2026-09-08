import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ManagePricing = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    features: '',
    isPopular: false
  });

  // Fetch Services from API
  const fetchServices = async () => {
    try {
      const { data } = await API.get('/services');
      setServices(data || []);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      // DB lo items unte avi vasthayi, lekunte local default services kanipisthayi
      if (res.data && res.data.length > 0) {
        setServices(res.data);
      } else {
        setServices(localServices); // Local fallback data
      }
    } catch (err) {
      console.error('API Error:', err);
      setServices(localServices);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

  // Create New Service Pricing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        features: formData.features.split(',').map((f) => f.trim()).filter(Boolean)
      };
      await API.post('/services', payload);
      setFormData({ title: '', price: '', description: '', features: '', isPopular: false });
      fetchServices();
    } catch (err) {
      console.error('Failed to create service:', err);
    }
  };

  // Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service package?')) return;
    try {
      await API.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  return (
    <div className="p-8 text-white max-w-6xl">
      <h1 className="text-3xl font-bold font-serif text-amber-500 mb-8">Live Service Pricing</h1>

      {/* Add New Service Form */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl mb-10">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">Add New Package</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Package Title (e.g. Traditional Wedding)"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g. 75,000)"
              value={formData.price}
              onChange={handleChange}
              required
              className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <textarea
            name="description"
            placeholder="Short Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
          ></textarea>

          <input
            type="text"
            name="features"
            placeholder="Features (comma separated: Full Day Photography, 4K Video, Drone Shots)"
            value={formData.features}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPopular"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
              className="accent-amber-500 w-4 h-4"
            />
            <label htmlFor="isPopular" className="text-sm text-neutral-300">Mark as Most Preferred (Popular)</label>
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Add Package
          </button>
        </form>
      </div>

      {/* Service Cards Listing */}
      {loading ? (
        <p className="text-neutral-500">Loading live services...</p>
      ) : services.length === 0 ? (
        <p className="text-neutral-400">No services found in database. Add one above to display here.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item) => (
            <div key={item._id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <span className="text-amber-400 font-extrabold text-lg">₹{item.price}</span>
                </div>
                <p className="text-neutral-400 text-xs mb-4">{item.description}</p>
                {item.features?.length > 0 && (
                  <ul className="text-xs text-neutral-300 space-y-1 mb-4 list-disc list-inside">
                    {item.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-neutral-800 mt-2">
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-neutral-800 text-amber-500">
                  {item.isPopular ? 'Most Preferred' : 'Standard'}
                </span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePricing;