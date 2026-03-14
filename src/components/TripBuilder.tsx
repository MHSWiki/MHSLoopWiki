
import React, { useState } from 'react';

const steps = [
  {
    id: 'timeline',
    question: 'How many days do you have?',
    options: [
      { label: '3 Days (The Blitz)', value: '3' },
      { label: '4 Days (The Sweet Spot)', value: '4' },
      { label: '5 Days (Deep Dive)', value: '5' },
      { label: '7+ Days (Slow Adventure)', value: '7' },
    ]
  },
  {
    id: 'experience',
    question: 'What is your riding experience?',
    options: [
      { label: "Beginner (First time on a bike)", value: 'beginner' },
      { label: "Intermediate (Regular city rider)", value: 'intermediate' },
      { label: "Pro (Experienced tourer/big bikes)", value: 'pro' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your daily budget?',
    options: [
      { label: "Tight (Hostels & Local eats)", value: 'budget' },
      { label: "Comfortable (Private rooms & Coffee)", value: 'mid' },
      { label: "Premium (Hotels & Big bikes)", value: 'premium' },
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
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1); // Move to email capture
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, logic to save to Mailchimp/Database would go here
    setSubmitted(true);
    console.log("Lead captured:", { email, selections });
  };

  if (submitted) {
    return (
      <div className="trip-builder-results bg-slate-900 border border-orange-500/30 rounded-2xl p-8 text-center animate-in fade-in duration-700">
        <h2 className="text-3xl font-bold mb-4 text-white">Your Itinerary is Ready! 🏍️</h2>
        <p className="text-gray-300 mb-6">We've sent your custom {selections.timeline}-day plan to <strong>{email}</strong>.</p>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
            <p className="text-orange-400 font-medium">Insider Tip:</p>
            <p className="text-white text-sm">Based on your {selections.experience} experience, we recommend renting a <strong>{selections.experience === 'beginner' ? 'Honda ADV 160' : 'Honda NX500'}</strong> for this trip.</p>
        </div>
        <button 
            onClick={() => window.location.href = '/route/overview'} 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all"
        >
            View Live Route Map
        </button>
      </div>
    );
  }

  if (currentStep === steps.length) {
    return (
      <div className="trip-builder-email bg-slate-900 border border-white/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Where should we send your plan?</h2>
        <p className="text-gray-400 mb-6">Includes your custom itinerary, gear list, and the "Hidden Gems" map.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
          <input 
            type="email" 
            required 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-orange-500"
          />
          <button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all"
          >
            Show Me The Itinerary
          </button>
        </form>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="trip-builder-wizard bg-slate-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12 shadow-2xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Step {currentStep + 1} of 3</span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentStep ? 'bg-orange-500' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-tight">{step.question}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="group flex flex-col items-start p-5 bg-slate-900 border border-white/5 hover:border-orange-500/50 rounded-xl transition-all hover:bg-orange-500/5 text-left"
          >
            <span className="text-white font-bold mb-1 group-hover:text-orange-500">{option.label}</span>
          </button>
        ))}
      </div>
      
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
        </svg>
      </div>
    </div>
  );
}
