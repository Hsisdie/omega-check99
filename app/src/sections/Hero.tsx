import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Calendar, Users, Facebook, Instagram, Twitter, Sparkles, ArrowRight, Clock, MapPin, TrendingUp, Wallet, PiggyBank, BarChart3, IndianRupee, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map((item, index) => (
        <div key={index} className="text-center group">
          <div className="countdown-box w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:border-[#39FF14]/50 group-hover:shadow-lg group-hover:shadow-[#39FF14]/20 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">{String(item.value).padStart(2, '0')}</span>
          </div>
          <span className="text-xs md:text-sm text-white/60 mt-2 block font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Floating Icon Component
function FloatingIcon({ icon: Icon, className, delay = 0, size = "md" }: { icon: React.ElementType; className: string; delay?: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8 md:w-10 md:h-10",
    md: "w-12 h-12 md:w-14 md:h-14",
    lg: "w-14 h-14 md:w-16 md:h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4 md:w-5 md:h-5",
    md: "w-6 h-6 md:w-7 md:h-7",
    lg: "w-7 h-7 md:w-8 md:h-8",
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon className={`${iconSizes[size]} text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]`} />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  // Event date: February 22, 2026
  const eventDate = new Date('2026-02-22T10:00:00');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial reveal animation
      const revealTl = gsap.timeline({ delay: 0.5 });

      // Content reveal
      revealTl.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Floating icons reveal
      revealTl.fromTo(
        floatingIconsRef.current?.children || [],
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        },
        '-=0.4'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse parallax for floating icons
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const icons = floatingIconsRef.current?.children;
      if (!icons) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      Array.from(icons).forEach((icon, index) => {
        const speed = (index % 3 + 1) * 0.02;
        const x = (e.clientX - centerX) * speed;
        const y = (e.clientY - centerY) * speed;

        gsap.to(icon, {
          x: x,
          y: y,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToRegister = () => {
    const formSection = document.getElementById('registration-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Primary glow - center top */}
        <div className="absolute top-[-30%] left-[50%] -translate-x-1/2 w-[1000px] h-[1000px] bg-[#39FF14]/8 rounded-full blur-[180px] animate-pulse-slow" />
        {/* Secondary glow - bottom left */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/6 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Tertiary glow - right */}
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath d='M0 0h50v50H0z' fill='none' stroke='%2339FF14' stroke-width='0.3'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/50" />
      </div>

      {/* Floating Financial Icons */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top row */}
        <FloatingIcon icon={TrendingUp} className="hidden md:flex top-[12%] left-[8%]" delay={0} size="lg" />
        <FloatingIcon icon={IndianRupee} className="top-[15%] right-[8%] md:right-[12%]" delay={0.5} size="md" />

        {/* Upper middle */}
        <FloatingIcon icon={BarChart3} className="hidden md:flex top-[25%] left-[18%]" delay={1} size="md" />
        <FloatingIcon icon={Wallet} className="hidden md:flex top-[20%] right-[22%]" delay={1.5} size="sm" />

        {/* Middle row */}
        <FloatingIcon icon={PiggyBank} className="top-[45%] left-[5%]" delay={2} size="lg" />
        <FloatingIcon icon={Target} className="hidden md:flex top-[40%] right-[8%]" delay={2.5} size="md" />

        {/* Lower middle */}
        <FloatingIcon icon={Shield} className="hidden md:flex top-[60%] left-[15%]" delay={3} size="sm" />
        <FloatingIcon icon={TrendingUp} className="hidden md:flex top-[55%] right-[18%]" delay={3.5} size="md" />

        {/* Bottom row */}
        <FloatingIcon icon={IndianRupee} className="hidden md:flex bottom-[20%] left-[10%]" delay={4} size="md" />
        <FloatingIcon icon={BarChart3} className="bottom-[25%] right-[5%] md:right-[10%]" delay={4.5} size="lg" />

        {/* 3D Images - Floating */}
        <img
          src="/coin-3d.png"
          alt=""
          className="hidden md:block absolute top-[18%] left-[3%] w-20 md:w-28 opacity-80 float-animation drop-shadow-[0_10px_30px_rgba(57,255,20,0.3)]"
          style={{ animationDelay: '0s' }}
        />
        <img
          src="/chart-3d.png"
          alt=""
          className="hidden md:block absolute top-[22%] right-[5%] w-24 md:w-32 opacity-80 float-animation-delay-1 drop-shadow-[0_10px_30px_rgba(57,255,20,0.3)]"
          style={{ animationDelay: '1s' }}
        />
        <img
          src="/piggy-3d.png"
          alt=""
          className="hidden md:block absolute bottom-[18%] left-[5%] w-20 md:w-28 opacity-80 float-animation-delay-2 drop-shadow-[0_10px_30px_rgba(57,255,20,0.3)]"
          style={{ animationDelay: '2s' }}
        />
        <img
          src="/coin-3d.png"
          alt=""
          className="hidden md:block absolute bottom-[22%] right-[3%] w-16 md:w-24 opacity-80 float-animation-delay-3 drop-shadow-[0_10px_30px_rgba(57,255,20,0.3)] scale-x-[-1]"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png.png"
              alt="Omega Financial"
              className="h-10 md:h-12 w-auto"
            />
          </div>

          <Button
            onClick={scrollToRegister}
            className="bg-[#39FF14] text-black hover:bg-white font-semibold px-4 md:px-6 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-[#39FF14]/30"
          >
            Register Free
          </Button>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#39FF14]/20 to-emerald-500/10 border border-[#39FF14]/30 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-semibold tracking-wide">FREE Exclusive Event</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6">
            <span className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Nivesh Ki</span>
            <span className="block text-[#39FF14] drop-shadow-[0_0_35px_rgba(57,255,20,0.6)]">
              Baat
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Master the Art of <span className="text-[#39FF14] font-semibold">Wealth Creation</span> — Learn proven strategies to build, grow, and protect your financial future.
          </p>

          {/* Event Details Cards */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <div className="group glass-card px-5 py-4 rounded-2xl flex items-center gap-3 hover:border-[#39FF14]/40 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-[#39FF14]/20 flex items-center justify-center group-hover:bg-[#39FF14]/30 transition-colors">
                <Calendar className="w-5 h-5 text-[#39FF14]" />
              </div>
              <div className="text-left">
                <p className="text-white/50 text-xs uppercase tracking-wider">Date</p>
                <p className="text-white font-bold">22 Feb 2026</p>
              </div>
            </div>
            <div className="group glass-card px-5 py-4 rounded-2xl flex items-center gap-3 hover:border-[#39FF14]/40 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-[#39FF14]/20 flex items-center justify-center group-hover:bg-[#39FF14]/30 transition-colors">
                <Clock className="w-5 h-5 text-[#39FF14]" />
              </div>
              <div className="text-left">
                <p className="text-white/50 text-xs uppercase tracking-wider">Time</p>
                <p className="text-white font-bold">10:00 AM - 1:00 PM</p>
              </div>
            </div>
            <div className="group glass-card px-5 py-4 rounded-2xl flex items-center gap-3 hover:border-[#39FF14]/40 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-[#39FF14]/20 flex items-center justify-center group-hover:bg-[#39FF14]/30 transition-colors">
                <MapPin className="w-5 h-5 text-[#39FF14]" />
              </div>
              <div className="text-left">
                <p className="text-white/50 text-xs uppercase tracking-wider">Location</p>
                <p className="text-white font-bold">Bhilai, C.G.</p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-5 font-medium">Event Starts In</p>
            <CountdownTimer targetDate={eventDate} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              onClick={scrollToRegister}
              className="group btn-neon bg-gradient-to-r from-[#39FF14] to-emerald-500 text-black hover:from-white hover:to-white hover:scale-105 px-10 py-7 text-lg font-bold rounded-full shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-3"
            >
              Register Now — It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
              <Users className="w-4 h-4 text-[#39FF14]" />
              <span>239+ Already Registered</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#39FF14]" />
              <span>100% Free Entry</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#39FF14]" />
              <span>Limited Seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 md:px-8 py-4 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-white/40 text-sm font-medium">Presented by Omega Financial</p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#39FF14] hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#39FF14] hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#39FF14] hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
