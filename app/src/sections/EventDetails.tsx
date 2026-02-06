import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Calendar, Clock, MapPin, Gift, BookOpen, TrendingUp, Shield, Target, Coins } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const learningPoints = [
  { icon: TrendingUp, title: 'How to build a strong financial foundation', description: 'Learn the core principles of wealth building' },
  { icon: Target, title: 'Secrets of successful investors', description: 'Strategies used by top wealth creators' },
  { icon: Shield, title: 'Planning for retirement & wealth', description: 'Secure your future with smart planning' },
  { icon: Coins, title: 'Risk management strategies', description: 'Protect your investments from volatility' },
  { icon: BookOpen, title: 'Mutual fund selection techniques', description: 'Pick winners like a professional' },
  { icon: Gift, title: 'Tax-saving investment options', description: 'Maximize returns, minimize taxes' },
];

export default function EventDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section reveal animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });

      // Content fade in
      scrollTl.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0
      );

      // Cards stagger in
      scrollTl.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.2
      );

      // Details card
      scrollTl.fromTo(
        detailsCardRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0.3
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-28 overflow-hidden"
    >
      {/* Gradient Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-medium">What You'll Learn</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Financial Future</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join us for an immersive 3-hour session that will completely change how you think about money and investing.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Learning Points Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4">
              {learningPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:border-[#39FF14]/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#39FF14]/20 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-[#39FF14]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover:text-[#39FF14] transition-colors">{point.title}</h4>
                        <p className="text-white/50 text-sm">{point.description}</p>
                      </div>
                    </div>
                    {/* Hover indicator */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#39FF14] text-xs font-medium">Learn more</span>
                      <Check className="w-4 h-4 text-[#39FF14]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Event Details Card */}
          <div className="lg:col-span-2" ref={detailsCardRef}>
            <div className="sticky top-24">
              {/* Main Details Card */}
              <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-white">Event Details</h3>
                  <div className="px-3 py-1 bg-[#39FF14] text-black text-xs font-bold rounded-full">
                    FREE
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#39FF14]/20 to-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Date</p>
                      <p className="text-white font-semibold">22nd February 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#39FF14]/20 to-emerald-500/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Time</p>
                      <p className="text-white font-semibold">10:00 AM - 1:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#39FF14]/20 to-emerald-500/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Location</p>
                      <p className="text-white font-semibold">Bhilai, Chhattisgarh</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-white/10" />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-[#39FF14]">3+</p>
                    <p className="text-white/50 text-xs">Hours</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-[#39FF14]">6</p>
                    <p className="text-white/50 text-xs">Topics</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-[#39FF14]">2</p>
                    <p className="text-white/50 text-xs">Bonuses</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full mt-6 btn-neon bg-[#39FF14] text-black hover:bg-white py-4 text-base font-bold rounded-xl neon-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  Reserve Your Seat
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-sm">
                <Shield className="w-4 h-4" />
                <span>100% Free • No Hidden Charges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
