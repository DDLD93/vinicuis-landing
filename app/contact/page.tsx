'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    service: ''
  });

  const services = [
    { id: 'security-solutions', name: 'Security & Solitary Solutions' },
    { id: 'construction', name: 'Construction (Saiha Constructions)' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'agro-trade-richfood-essentials', name: 'Agro-Trade (Richfood Essentials)' },
    { id: 'private-aviation', name: 'Private Aviation' },
    { id: 'emerging-ventures', name: 'Emerging Ventures' },
    { id: 'pharmaceutical-development', name: 'Pharmaceutical Development' },
    { id: 'football-academy', name: 'Football Academy' },
    { id: 'ascc-security', name: 'ASCC Security' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Handle service parameter from URL
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const selectedService = services.find(s => s.id === serviceParam);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          service: selectedService.id,
          subject: `Inquiry about ${selectedService.name}`
        }));
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '', service: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@vinicius.com',
      link: 'mailto:info@vinicius.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+234 70x xxx xxxx',
      link: 'tel:+2347035469259'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 8:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-red-400">Us</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to elevate your security measures? Let&apos;s build a robust strategy together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center card-hover bg-white p-8 rounded-lg shadow-lg">
                <info.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{info.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{info.details}</p>
                {info.link !== '#' && (
                  <a 
                    href={info.link} 
                    className="inline-block mt-3 text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
                  >
                    Get in touch
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Send Us a <span className="text-gradient">Message</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Your safety is our priority - Vinicius International, where excellence meets security.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-300"
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-300 resize-none"
                    placeholder="Enter your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Contact Details & Social */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Office Address</p>
                      <p className="text-gray-600">13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:info@vinicius.com" className="text-red-600 hover:text-red-700">
                        info@vinicius.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">
                        <a href="tel:+2347035469259" className="text-red-600 hover:text-red-700">
                          +234 70x xxx xxxx
                        </a>
                        <br />
                        <a href="tel:+2348032346067" className="text-red-600 hover:text-red-700">
                          +234 80x xxx xxxx
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <p className="text-gray-300 mb-6">
                  Connect with us on social media for the latest updates and news.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join the many satisfied clients who trust Vinicius International for their security 
            and infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2347035469259" className="btn-secondary text-lg px-8 py-4">
              Call Now
            </a>
            <a href="mailto:info@vinicius.com" className="btn-primary text-lg px-8 py-4">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}