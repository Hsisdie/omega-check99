import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, BookOpen, Gift, Check, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const bonus1Features = [
  'Personalized investment advice',
  'Portfolio review & optimization',
  'Goal-based financial planning',
  'Risk assessment discussion',
];

const bonus2Features = [
  'Complete wealth building guide',
  'Proven investment strategies',
  'Tax-saving investment tips',
  'Market analysis techniques',
];

export default function Bonuses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 10%',
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
        card1Ref.current,
        { x: -50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.2
      );

      scrollTl.fromTo(
        card2Ref.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
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
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[30%] right-[15%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-2 rounded-full mb-6">
            <Gift className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-medium">Exclusive Bonuses</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Worth <span className="relative inline-block mx-2">
              <span className="text-gray-400">₹2,999</span>
              <div className="absolute top-1/2 left-[-10%] w-[120%] h-[3px] bg-white shadow-[0_0_15px_rgba(255,255,255,1)] rotate-[-12deg] rounded-full"></div>
            </span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">FREE</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Register today and unlock these exclusive bonuses absolutely free of charge
          </p>
        </div>

        {/* Bonus Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Bonus 1 - Free Call */}
          <div
            ref={card1Ref}
            className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#39FF14]/40"
          >
            {/* Premium glow effect */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#39FF14]/10 rounded-full blur-3xl group-hover:bg-[#39FF14]/20 transition-all duration-500" />

            {/* Card content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#39FF14]/30 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-[#39FF14]" />
                  </div>
                  <div>
                    <span className="text-[#39FF14] text-xs font-bold uppercase tracking-wider">Bonus 1</span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">15 Min Free Call</h3>
                  </div>
                </div>
                <div className="bg-[#39FF14] text-black text-xs font-bold px-3 py-1 rounded-full">
                  ₹999 Value
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 mb-6 leading-relaxed">
                Get a personalized 15-minute consultation call with our financial expert
                to discuss your investment goals and receive tailored advice.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {bonus1Features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#39FF14]" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Phone Mockup */}
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/10 to-transparent blur-2xl" />
                <img
                  src="/phone-mockup.png"
                  alt="Free Call Consultation"
                  className="relative w-40 h-auto float-animation drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bonus 2 - Free Ebook */}
          <div
            ref={card2Ref}
            className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:border-emerald-400/40"
          >
            {/* Premium glow effect */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all duration-500" />

            {/* Card content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Bonus 2</span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Premium E-Book</h3>
                  </div>
                </div>
                <div className="bg-emerald-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  ₹1999 Value
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 mb-6 leading-relaxed">
                Receive our comprehensive finance ebook packed with proven strategies
                for building wealth and achieving financial freedom.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {bonus2Features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Tablet Mockup */}
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 to-transparent blur-2xl" />
                <img
                  src="/tablet-mockup.png"
                  alt="Free Finance Ebook"
                  className="relative w-48 h-auto float-animation-delay-1 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl">
            <Sparkles className="w-5 h-5 text-[#39FF14]" />
            <span className="text-white">
              Total Bonus Value: <span className="text-[#39FF14] font-bold text-lg">₹2,999</span>
            </span>
            <span className="text-white/50 mx-2">|</span>
            <span className="text-emerald-400 font-semibold">Yours FREE Today!</span>
          </div>

          <button
            onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 inline-flex items-center gap-2 btn-neon bg-[#39FF14] text-black hover:bg-white px-8 py-4 text-base font-bold rounded-full neon-glow transition-all duration-300 hover:scale-105"
          >
            Claim Your Bonuses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
