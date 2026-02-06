import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );

    // Progress bar animation
    tl.to(progressRef.current, {
      width: '100%',
      duration: 0.3,
      ease: 'power2.inOut',
    }, 0);

    // Fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.inOut',
    }, '+=0.1');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999]"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 via-transparent to-emerald-500/5" />

      {/* Logo */}
      <div ref={logoRef} className="relative flex flex-col items-center">
        <img
          src="/logo.png.png"
          alt="Omega Financial"
          className="h-12 w-auto"
        />

        <div className="mt-4 text-center">
          <p className="text-[#39FF14] text-sm font-medium">
            Nivesh Ki Baat 2.0
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-[#39FF14] to-emerald-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
