import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import EventDetails from './sections/EventDetails';
import Speaker from './sections/Speaker';
import Bonuses from './sections/Bonuses';
import RegistrationForm from './sections/RegistrationForm';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize scroll animations after loading
      const ctx = gsap.context(() => {
        // Refresh ScrollTrigger after content loads
        ScrollTrigger.refresh();
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CustomCursor />

      <div ref={mainRef} className="relative bg-[#050505] min-h-screen">
        {/* Hero Section - Promotional Only */}
        <section className="relative z-10">
          <Hero />
        </section>

        {/* Speaker Section - Immediately After Hero */}
        <section className="relative z-20">
          <Speaker />
        </section>

        {/* Event Details Section - What You'll Learn */}
        <section className="relative z-30">
          <EventDetails />
        </section>

        {/* Bonuses Section */}
        <section className="relative z-40">
          <Bonuses />
        </section>

        {/* Registration Form Section */}
        <section className="relative z-50">
          <RegistrationForm />
        </section>

        {/* Footer */}
        <footer className="relative z-50 bg-[#030303] border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Logo & Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <img
                    src="/logo.png.png"
                    alt="Omega Financial"
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-white/40 text-sm">
                  Your trusted partner for wealth creation & financial freedom.
                </p>
              </div>

              {/* Event Badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                  <span className="text-[#39FF14] text-sm font-medium">Nivesh Ki Baat 2.0 2026</span>
                </div>
                <p className="text-white/30 text-xs mt-2">22 Feb 2026 • Bhilai, C.G.</p>
              </div>

              {/* Links */}
              <div className="flex items-center justify-center md:justify-end gap-6">
                <a
                  href="https://www.omegafinancial.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#39FF14] transition-colors text-sm"
                >
                  Website
                </a>
                <a
                  href="mailto:contact@omegafinancial.co.in"
                  className="text-white/50 hover:text-[#39FF14] transition-colors text-sm"
                >
                  Email
                </a>
                <a
                  href="tel:+919876543210"
                  className="text-white/50 hover:text-[#39FF14] transition-colors text-sm"
                >
                  Call
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-sm">
                © 2026 Omega Financial. All rights reserved.
              </p>
              <p className="text-white/20 text-xs">
                Made with ❤️ for your financial growth
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
