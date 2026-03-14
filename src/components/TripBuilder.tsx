
import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
  icon: string;
  sub?: string;
}

interface Step {
  id: string;
  question: string;
  description: string;
  options: Option[];
}

const steps: Step[] = [
  {
    id: 'timeline',
    question: 'How many days do you have?',
    description: 'The loop is 600km+. Your timeline determines your daily fatigue and how many side trips you can handle.',
    options: [
      { label: '3 Days (The Blitz)', value: '3', icon: '⚡' },
      { label: '4 Days (The Sweet Spot)', value: '4', icon: '🎯' },
      { label: '5 Days (Deep Dive)', value: '5', icon: '🍵' },
      { label: '7+ Days (Slow Adventure)', value: '7', icon: '🎒' },
    ]
  },
  {
    id: 'experience',
    question: 'What is your riding experience?',
    description: 'Steep grades and 1,864 curves. We\'ll match you with the right bike and safety level.',
    options: [
      { label: "Beginner", sub: "New to bikes", value: 'beginner', icon: '🔰' },
      { label: "Intermediate", sub: "Regular city rider", value: 'intermediate', icon: '🏍️' },
      { label: "Pro", sub: "Experienced tourer", value: 'pro', icon: '🏆' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your daily budget?',
    description: 'From 150 THB hostels to 4,000 THB luxury riverside tea houses.',
    options: [
      { label: "Tight", sub: "Hostels & Street food", value: 'budget', icon: '💵' },
      { label: "Comfortable", sub: "Private rooms & Cafes", value: 'mid', icon: '💳' },
      { label: "Premium", sub: "Luxury stays & Big bikes", value: 'premium', icon: '💎' },
    ]
  }
];

export default function TripBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    const newSelections = { ...selections, [steps[currentStep].id]: value };
    setSelections(newSelections);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Lead captured:", { email, selections });
  };

  if (submitted) {
    return (
      <div className="trip-builder-results bg-slate-900/80 backdrop-blur-md border-2 border-orange-500 rounded-3xl p-10 text-center animate-in zoom-in duration-500 shadow-[0_0_50px_-12px_rgba(249,115,22,0.5)]">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">Strategy Generated!</h2>
        <p className="text-gray-300 mb-8 text-lg">We've tailored the <strong>{selections.timeline}-day {selections.experience}</strong> plan for your <strong>{selections.budget}</strong> budget. Check your inbox at <strong>{email}</strong>!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-orange-500 text-xs font-bold uppercase mb-1">Recommended Bike</p>
                <p className="text-white font-medium">{selections.experience === 'beginner' ? 'Honda ADV 160 (Scooter)' : 'Honda NX500 (Tourer)'}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-orange-500 text-xs font-bold uppercase mb-1">Primary Hazard</p>
                <p className="text-white font-medium">{selections.experience === 'beginner' ? 'Brake Overheating' : 'Gravel on Apex'}</p>
            </div>
        </div>

        <button 
            onClick={() => window.location.href = '/'} 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-orange-900/20 active:scale-95"
        >
            BACK TO MASTERPLAN
        </button>
      </div>
    );
  }

  if (currentStep === steps.length) {
    return (
      <div className="trip-builder-email bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative h-48 bg-slate-800 flex items-center justify-center overflow-hidden">
            <img 
                src="/_astro/blurry_map_teaser.webp" 
                alt="Secret Magic" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            <div className="relative text-center px-6">
                <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter">The Secret Magic</h3>
                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">Unlocking Private Route Layer...</p>
            </div>
        </div>
        
        <div className="p-8 text-center bg-slate-900">
            <h2 className="text-2xl font-bold mb-3 text-white">Where should we send your plan?</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">Join 1,200+ riders. You'll receive the custom itinerary, our <span className="text-white font-medium">"Invisible Grandma"</span> safety cheat sheet, and a curated list of stops for your specific budget.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
              <input 
                type="email" 
                required 
                placeholder="rider@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-2 border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-colors text-lg"
              />
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-orange-900/40 text-lg uppercase tracking-tight active:scale-95"
              >
                Get The Full Masterplan 🏍️
              </button>
              <p className="text-[10px] text-gray-500 mt-2 italic">Zero spam. Hardcore riding advice only. Unsubscribe anytime.</p>
            </form>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="trip-builder-wizard bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 mb-12 shadow-2xl transition-all">
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">AI Logistics Widget</span>
            <div className="flex gap-1.5">
                {steps.map((_, i) => (
                    <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/5'}`} />
                ))}
            </div>
        </div>
        <span className="text-xs font-bold text-gray-500 tabular-nums">{currentStep + 1} / 3</span>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-3 text-white leading-[1.1] tracking-tight">{step.question}</h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="group relative flex items-center gap-5 p-6 bg-slate-800/50 border border-white/5 hover:border-orange-500/50 rounded-2xl transition-all hover:bg-orange-500/[0.03] text-left hover:-translate-y-1"
          >
            <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{option.icon}</span>
            <div className="flex flex-col">
                <span className="text-white font-black text-lg leading-tight group-hover:text-orange-500 transition-colors uppercase tracking-tight">{option.label}</span>
                {option.sub && <span className="text-gray-500 text-xs font-medium">{option.sub}</span>}
            </div>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
