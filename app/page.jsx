import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const upcomingEventsRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      upcomingEventsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tickets = [
    {
      id: 1,
      title: 'Konser Raisa Live in Jakarta',
      category: 'musik',
      price: 350000,
      originalPrice: 450000,
      location: 'Jakarta International Expo',
      date: '2025-12-15',
      time: '19:00',
      rating: 4.8,
      image: 'Konser musik dengan penyanyi terkenal di panggung megah',
      description: 'Nikmati konser spektakuler Raisa dengan hits terbaiknya',
      available: 150,
      type: 'VIP'
    },
    {
      id: 3,
      title: 'Pertandingan Persija vs Persib',
      category: 'olahraga',
      price: 75000,
      originalPrice: 100000,
      location: 'Stadion Gelora Bung Karno',
      date: '2025-12-18',
      time: '15:30',
      rating: 4.7,
      image: 'Stadion sepak bola penuh dengan penonton yang antusias',
      description: 'El Clasico Indonesia yang paling ditunggu-tunggu',
      available: 2500,
      type: 'Tribune'
    },
    {
      id: 4,
      title: 'Teater Musikal Mahabharata',
      category: 'teater',
      price: 250000,
      originalPrice: 300000,
      location: 'Teater Jakarta',
      date: '2025-12-22',
      time: '20:00',
      rating: 4.9,
      image: 'Panggung teater dengan kostum tradisional yang megah',
      description: 'Pertunjukan teater musikal epik dengan teknologi modern',
      available: 80,
      type: 'Premium'
    },
    {
      id: 6,
      title: 'Festival Jazz Internasional',
      category: 'musik',
      price: 500000,
      originalPrice: 650000,
      location: 'Ancol Beach City',
      date: '2025-12-30',
      time: '18:00',
      rating: 4.8,
      image: 'Panggung outdoor dengan musisi jazz bermain saxophone',
      description: 'Festival jazz terbesar dengan artis internasional',
      available: 300,
      type: 'Festival Pass'
    }
  ];

  const promoImages = [
    { id: 1, alt: 'Solusi Ticketing Ekonomis!', content: 'Hubungi kami, kita diskusikan solusi ticketing terbaik untuk eventmu!', imageUrl: 'https://horizons-cdn.hostinger.com/b8bed929-c3f7-4b13-a775-199698fcace7/c93d66664f8394cc6c8b28fac7350446.png' },
    { id: 2, alt: 'Launching Web TicketGo.id', content: 'Daftarkan eventmu, gratis!', imageUrl: 'https://horizons-cdn.hostinger.com/b8bed929-c3f7-4b13-a775-199698fcace7/2332791be3ffdec8dd44d18acfef7ed2.png' },
  ];

  const addToCart = (ticket) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === ticket.id);
      if (existing) {
        return prev.map(item => 
          item.id === ticket.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
    toast({
      title: "Berhasil ditambahkan!",
      description: `${ticket.title} telah ditambahkan ke keranjang.`,
    });
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>TicketGo - Jual Beli Tiket Event Online</title>
        <meta name="description" content="Beli tiket event, konser, dan acara lainnya dengan mudah dan aman di TicketGo. Temukan event favoritmu sekarang!" />
        <meta property="og:title" content="TicketGo - Jual Beli Tiket Event Online" />
        <meta property="og:description" content="Beli tiket event, konser, dan acara lainnya dengan mudah dan aman di TicketGo. Temukan event favoritmu sekarang!" />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={handleSearch} 
        />
        <main>
          <Hero promoImages={promoImages} />
          <div ref={upcomingEventsRef}>
            <UpcomingEvents 
              tickets={filteredTickets} 
              addToCart={addToCart} 
            />
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default App;
