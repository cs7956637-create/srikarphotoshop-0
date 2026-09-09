import React, { useState } from 'react';
import API from '../api/axios';

const ContractForm = () => {
  // Fields matched with Mongoose Enquiry Schema: name, phone, service, date, message
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Wedding',
    date: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      // POST route matched with server.js app.use('/api/enquiries', ...)
      await API.post('/enquiries', formData);
      
      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Wedding',
        date: '',
        message: ''
      });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit enquiry. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-white px-6 relative overflow-hidden">
      {/* Ambient Light Effect */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] bottom-10 right-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Bookings & Inquiries
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif gold-gradient-text mt-4">
            Plan Your Special Event
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto">
            Fill in your event details below to check our date availability and receive custom package estimates.
          </p>
        </div>

        {/* Form */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          {status.success && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl text-amber-400 text-sm text-center font-semibold">
              🎉 Enquiry submitted successfully! We will contact you back shortly.
            </div>
          )}

          {status.error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/40 rounded-2xl text-red-400 text-sm text-center font-semibold">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Service Category *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
                >
                  <option value="Wedding">Traditional Wedding</option>
                  <option value="Cinematic Wedding">Cinematic Suite</option>
                  <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                  <option value="Portrait/Birthday">Portrait / Event</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Target Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                Additional Details / Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention venue location or specific expectations..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/80 transition duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {status.loading ? 'Submitting Details...' : 'Send Inquiry Request'}
            </button>
          </form>
          {/* Google Map Section */}
<div className="mt-8 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl h-80 w-full">
  <iframe
    title="Srikar Studio Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.83!2d72.5713!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzMnMTYuOSJF!2sAhmedabad!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
        </div>
      </div>
    </section>
  );
};

export default ContractForm;