import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Mail, Phone, MapPin, CheckCircle, Calendar, Users, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  city?: string;
}

export default function RegistrationForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });

      // Content reveal
      scrollTl.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', mobile: '', city: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      id="registration-form"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-20 lg:py-28 overflow-hidden"
    >
      {/* Gradient Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src="/coin-3d.png" alt="" className="absolute top-[10%] left-[5%] w-16 opacity-10 float-animation" />
        <img src="/chart-3d.png" alt="" className="absolute top-[20%] right-[10%] w-20 opacity-10 float-animation-delay-1" />
        <img src="/piggy-3d.png" alt="" className="absolute bottom-[15%] left-[8%] w-24 opacity-10 float-animation-delay-2" />
        <img src="/coin-3d.png" alt="" className="absolute bottom-[20%] right-[5%] w-14 opacity-10 float-animation-delay-3" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-[#39FF14] text-sm font-medium">Free Registration</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">Spot</span> Now
            </h2>

            <p className="text-white/60 text-lg">
              Join 239+ smart investors who have already registered for this exclusive financial mastery session.
            </p>

            {/* Event Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Date</p>
                  <p className="text-white font-semibold">22nd February 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Time</p>
                  <p className="text-white font-semibold">10:00 AM - 1:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Location</p>
                  <p className="text-white font-semibold">Bhilai, Chhattisgarh</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Shield className="w-4 h-4 text-[#39FF14]" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <CheckCircle className="w-4 h-4 text-[#39FF14]" />
                <span>Free Entry</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Users className="w-4 h-4 text-[#39FF14]" />
                <span>Limited Seats</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-6 lg:p-10"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Register for Free</h3>
                <p className="text-white/50">Fill in your details to secure your spot</p>
              </div>

              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <Label htmlFor="name" className="text-white/80 mb-2 block font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#39FF14]/50 focus:ring-[#39FF14]/20 transition-all ${errors.name ? 'border-red-500/50' : ''
                        }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <Label htmlFor="email" className="text-white/80 mb-2 block font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#39FF14]/50 focus:ring-[#39FF14]/20 transition-all ${errors.email ? 'border-red-500/50' : ''
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Input */}
                <div>
                  <Label htmlFor="mobile" className="text-white/80 mb-2 block font-medium">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#39FF14]/50 focus:ring-[#39FF14]/20 transition-all ${errors.mobile ? 'border-red-500/50' : ''
                        }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* City Input */}
                <div>
                  <Label htmlFor="city" className="text-white/80 mb-2 block font-medium">
                    City
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#39FF14]/50 focus:ring-[#39FF14]/20 transition-all ${errors.city ? 'border-red-500/50' : ''
                        }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon bg-[#39FF14] text-black hover:bg-white hover:scale-[1.02] py-6 text-lg font-bold rounded-xl neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Register Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#39FF14]" />
                    <span>239+ Registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#39FF14]" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#39FF14]" />
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#39FF14]/30 to-emerald-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-[#39FF14]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              You're Registered! 🎉
            </DialogTitle>
            <DialogDescription className="text-white/60 mt-2">
              Congratulations! You've successfully registered for <strong className="text-white">Nivesh Ki Baat</strong>.
              We've sent a confirmation email with all the event details.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 p-4 glass-card rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#39FF14]" />
              <span className="text-sm text-white/80">22nd February 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#39FF14]" />
              <span className="text-sm text-white/80">10:00 AM - 1:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#39FF14]" />
              <span className="text-sm text-white/80">Bhilai, Chhattisgarh</span>
            </div>
          </div>
          <Button
            onClick={() => setShowSuccess(false)}
            className="w-full mt-6 bg-[#39FF14] text-black hover:bg-white font-bold py-4 rounded-xl"
          >
            Got it, See you there!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
