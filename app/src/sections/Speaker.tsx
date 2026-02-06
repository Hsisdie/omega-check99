import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, TrendingUp, Users, BookOpen, Star, Quote, CheckCircle, IndianRupee, BarChart3, Shield, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { icon: TrendingUp, label: 'Sessions Delivered', value: '3,400+' },
  { icon: Users, label: 'Investors Empowered', value: '1 Million+' },
  { icon: BookOpen, label: 'Experience', value: '30+ Years' },
];

const credentials = [
  'IIT Delhi Alumnus',
  'Co-Founder, OSAT Knowledge',
  'Expert in Psychology of Wealth',
  'Financial Freedom Strategist',
];

// Floating Background Icon
function FloatingIcon({ icon: Icon, className, delay = 0 }: { icon: React.ElementType; className: string; delay?: number }) {
  return (
    <div
      className={`absolute w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-sm ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon className="w-6 h-6 text-[#39FF14]/40" />
    </div>
  );
}

export default function Speaker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const cardBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image Parallax - Move simpler 3D effect
      gsap.to(imageRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Background Card Scale
      gsap.from(cardBgRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      });

      // Floating UI Entrance
      gsap.from('.floating-ui', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <FloatingIcon icon={IndianRupee} className="top-[10%] left-[5%]" delay={0} />
        <FloatingIcon icon={BarChart3} className="top-[30%] right-[10%]" delay={1.5} />
        <FloatingIcon icon={Shield} className="bottom-[15%] left-[15%]" delay={2.5} />
        <FloatingIcon icon={Target} className="bottom-[40%] right-[5%]" delay={3.5} />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <Star className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-medium">Meet Your Mentor</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            THE MAN BEHIND THE <span className="text-[#39FF14] drop-shadow-[0_0_20px_rgba(57,255,20,0.6)]">REVOLUTION</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">

          {/* LEFT COLUMN: 3D Image Composition */}
          {/* LEFT COLUMN: 3D Image Composition */}
          <div className="relative flex justify-center lg:justify-end pb-12 lg:pb-0 h-[500px] sm:h-[600px] flex items-end mt-8 lg:mt-0">

            {/* 1. Background Glass Card (The "Box" behind him) */}
            <div
              ref={cardBgRef}
              className="absolute bottom-0 w-full max-w-[320px] sm:max-w-[400px] h-[350px] sm:h-[450px] bg-gradient-to-b from-white/10 to-black/40 backdrop-blur-md rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 overflow-visible shadow-2xl"
            >
              <div className="absolute inset-0 bg-[#39FF14]/5 rounded-[2.5rem] sm:rounded-[3rem]" />
              {/* Neon Ring behind head */}
              <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#39FF14]/20 rounded-full blur-[60px] sm:blur-[80px]" />
            </div>

            {/* 2. The Cutout Image (Breaking the boundaries) */}
            <img
              ref={imageRef}
              src="/krishan-sharma.jpg.jpg"
              alt="Krishan Sharma"
              className="relative z-10 w-full h-full object-cover rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl max-w-[320px] sm:max-w-none"
              style={{ marginBottom: '0' }}
            />

            {/* 3. Floating UI Name Plate */}
            <div className="floating-ui absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-[340px] z-20">
              <div className="glass-card bg-[#050505]/90 backdrop-blur-xl border border-[#39FF14]/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Krishan Sharma</h3>
                <p className="text-[#39FF14] text-[10px] sm:text-xs font-bold tracking-widest uppercase">Co-Founder, OSAT Knowledge</p>
              </div>
            </div>

            {/* 4. Floating Badge (Top Right) */}
            <div className="floating-ui absolute top-12 sm:top-20 -right-2 sm:right-0 lg:-right-4 z-20">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#39FF14] rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] sm:shadow-[0_0_40px_rgba(57,255,20,0.4)] border-[4px] sm:border-[6px] border-[#0a0a0a] animate-spin-slow-reverse transform scale-90 sm:scale-100">
                <span className="text-black font-black text-lg sm:text-2xl leading-none">30+</span>
                <span className="text-black text-[8px] sm:text-[10px] font-bold uppercase">Years</span>
              </div>
            </div>

            {/* 5. Quote Bubble (Mid Left) */}
            <div className="floating-ui absolute bottom-32 sm:bottom-40 -left-6 sm:left-0 lg:-left-12 max-w-[140px] sm:max-w-[180px] z-20 hidden xs:block">
              <div className="glass-card bg-[#0a0a0a]/90 border-l-4 border-[#39FF14] p-3 sm:p-4 rounded-xl shadow-xl">
                <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-[#39FF14] mb-2" />
                <p className="text-white/80 text-[10px] sm:text-xs italic">"I teach you how to make your money work for you."</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info & Bio */}
          <div ref={infoRef} className="space-y-8 lg:mb-12 mt-12 lg:mt-0">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-center lg:text-left">
              An IIT Delhi Alumnus & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Master of Wealth Psychology</span>
            </h3>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed text-justify">
              With over <span className="text-white font-semibold">30 years</span> of market mastery, I don't just talk numbers—I decode the psychology behind them. Having empowered <span className="text-white font-semibold">1 Million+ investors</span> through <span className="text-white font-semibold">3,400+ sessions</span>, my mission is simple: To take you from being a 'Saver' to a smart 'Investor'.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {credentials.map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg lg:bg-transparent lg:p-0">
                  <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              {achievements.map((item, index) => (
                <div key={index} className="text-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39FF14]/30 transition-colors">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{item.value}</p>
                  <p className="text-[#39FF14] text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 text-center lg:text-left">
              <button
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto btn-neon bg-[#39FF14] text-black hover:bg-white px-8 sm:px-10 py-4 text-base font-bold rounded-full neon-glow transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>Learn From The Master</span>
                <Award className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
