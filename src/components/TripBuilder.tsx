
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
    description: 'The loop is 600km+. Your timeline sets the pace and how many detours you can handle.',
    options: [
      { label: '3 Days', sub: 'The Blitz', value: '3', icon: '⚡' },
      { label: '4 Days', sub: 'The Sweet Spot', value: '4', icon: '🎯' },
      { label: '5 Days', sub: 'Deep Dive', value: '5', icon: '🍵' },
      { label: '7+ Days', sub: 'Slow Adventure', value: '7', icon: '🎒' },
    ],
  },
  {
    id: 'experience',
    question: 'Your riding experience?',
    description: '1,864 curves. We\'ll match you with the right bike and safety briefing.',
    options: [
      { label: 'Beginner', sub: 'New to bikes', value: 'beginner', icon: '🔰' },
      { label: 'Intermediate', sub: 'Regular city rider', value: 'intermediate', icon: '🏍️' },
      { label: 'Pro', sub: 'Experienced tourer', value: 'pro', icon: '🏆' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your daily budget?',
    description: 'From 150 THB hostels to 4,000 THB luxury riverside tea houses.',
    options: [
      { label: 'Tight', sub: 'Hostels & Street food', value: 'budget', icon: '💵' },
      { label: 'Comfortable', sub: 'Private rooms & Cafes', value: 'mid', icon: '💳' },
      { label: 'Premium', sub: 'Luxury stays & Big bikes', value: 'premium', icon: '💎' },
    ],
  },
];

// ─── Shared styles ─────────────────────────────────────────────────────────────
const WIDGET_WRAP: React.CSSProperties = {
  background: 'linear-gradient(160deg, #16191f 0%, #0e1014 100%)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '18px',
  overflow: 'hidden',
  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  marginBottom: '2rem',
  maxWidth: '620px',
};

const HEADER_BAR: React.CSSProperties = {
  background: 'rgba(255,255,255,0.025)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  padding: '11px 18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const HEADER_LEFT: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const BRAND_DOT: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#ff8c00',
  boxShadow: '0 0 8px rgba(255,140,0,0.7)',
  flexShrink: 0,
};

const BRAND_LABEL: React.CSSProperties = {
  color: '#ff8c00',
  fontSize: '10px',
  fontWeight: 800,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

const STEP_BODY: React.CSSProperties = {
  padding: '26px 22px 22px',
};

const QUESTION_LABEL: React.CSSProperties = {
  color: '#4b5563',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const QUESTION_HEADING: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.25,
  marginBottom: '7px',
};

const QUESTION_DESC: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: 1.65,
  marginBottom: '0',
};

const OPTIONS_GRID = (cols: number): React.CSSProperties => ({
  padding: '0 14px 18px',
  display: 'grid',
  gridTemplateColumns: cols === 2 ? 'repeat(2, 1fr)' : '1fr',
  gap: '10px',
});

const OPTION_BTN: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '13px',
  padding: '15px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 0.14s, border-color 0.14s, transform 0.14s',
  width: '100%',
};

const CHIP: React.CSSProperties = {
  background: 'rgba(34,197,94,0.1)',
  border: '1px solid rgba(34,197,94,0.25)',
  color: '#86efac',
  fontSize: '11px',
  fontWeight: 600,
  padding: '4px 10px',
  borderRadius: '99px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
};

// ─── Component ──────────────────────────────────────────────────────────────────
export default function TripBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    const next = { ...selections, [steps[currentStep].id]: value };
    setSelections(next);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Lead captured:', { email, selections });
  };

  const getLabel = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId);
    const opt = step?.options.find((o) => o.value === selections[stepId]);
    return opt ? `${opt.icon} ${opt.label}` : null;
  };

  const ProgressDots = ({ complete = false }: { complete?: boolean }) => (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {steps.map((_, i) => {
        const done = complete || i < currentStep;
        const active = !complete && i === currentStep;
        return (
          <div
            key={i}
            style={{
              width: active ? '22px' : '8px',
              height: '8px',
              borderRadius: '99px',
              background: done ? '#22c55e' : active ? '#ff8c00' : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              boxShadow: done
                ? '0 0 6px rgba(34,197,94,0.5)'
                : active
                ? '0 0 8px rgba(255,140,0,0.6)'
                : 'none',
            }}
          />
        );
      })}
      {!complete && (
        <span style={{ color: '#374151', fontSize: '11px', fontWeight: 700, marginLeft: '2px' }}>
          {currentStep + 1}/3
        </span>
      )}
    </div>
  );

  const SelectionBreadcrumb = () => {
    if (currentStep === 0) return null;
    return (
      <div
        style={{
          padding: '9px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap' as const,
        }}
      >
        {steps.slice(0, currentStep).map((s) => {
          const lbl = getLabel(s.id);
          return lbl ? (
            <span key={s.id} style={CHIP}>
              ✓ {lbl}
            </span>
          ) : null;
        })}
      </div>
    );
  };

  // ── Submitted ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ ...WIDGET_WRAP, border: '1px solid rgba(255,140,0,0.35)' }}>
        <div style={{ ...HEADER_BAR, background: 'rgba(255,140,0,0.07)', borderColor: 'rgba(255,140,0,0.15)' }}>
          <div style={HEADER_LEFT}>
            <div style={{ ...BRAND_DOT, background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.7)' }} />
            <span style={BRAND_LABEL}>Plan Generated</span>
          </div>
          <ProgressDots complete />
        </div>

        <div style={{ padding: '36px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '44px', marginBottom: '14px' }}>🏍️</div>
          <h2
            style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Your Plan Is Ready
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
            Your{' '}
            <strong style={{ color: '#fff' }}>
              {selections.timeline}-day {selections.experience}
            </strong>{' '}
            itinerary for a{' '}
            <strong style={{ color: '#fff' }}>{selections.budget}</strong> budget is heading
            to <strong style={{ color: '#ff8c00' }}>{email}</strong>.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '24px',
              textAlign: 'left',
            }}
          >
            {[
              {
                label: 'Recommended Bike',
                value:
                  selections.experience === 'beginner' ? 'Honda ADV 160' : 'Honda NX500',
              },
              {
                label: 'Primary Hazard',
                value:
                  selections.experience === 'beginner'
                    ? 'Brake Overheating'
                    : 'Gravel on Apex',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                }}
              >
                <p
                  style={{
                    color: '#ff8c00',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '5px',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => (window.location.href = '/')}
            style={{
              background: 'linear-gradient(135deg, #ff8c00 0%, #c97200 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '14px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Back to Masterplan →
          </button>
        </div>
      </div>
    );
  }

  // ── Email capture ──────────────────────────────────────────────────────────
  if (currentStep === steps.length) {
    return (
      <div style={WIDGET_WRAP}>
        <div style={HEADER_BAR}>
          <div style={HEADER_LEFT}>
            <div style={BRAND_DOT} />
            <span style={BRAND_LABEL}>AI Trip Builder</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
            {steps.map((s, i) => {
              const lbl = getLabel(s.id);
              return lbl ? (
                <span key={i} style={{ ...CHIP, fontSize: '10px', padding: '3px 8px' }}>
                  {lbl}
                </span>
              ) : null;
            })}
          </div>
        </div>

        <div style={{ padding: '30px 22px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,140,0,0.12)',
              border: '1px solid rgba(255,140,0,0.25)',
              borderRadius: '99px',
              padding: '4px 14px',
              color: '#ff8c00',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            🔓 One Last Step
          </div>
          <h2
            style={{
              color: '#fff',
              fontSize: '21px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}
          >
            Where should we send your plan?
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: '13px',
              lineHeight: 1.7,
              marginBottom: '24px',
              maxWidth: '380px',
              margin: '0 auto 24px',
            }}
          >
            Join 1,200+ riders. You'll get the custom itinerary + our{' '}
            <span style={{ color: '#d1d5db' }}>"Invisible Grandma"</span> safety cheat sheet
            and a curated stop list for your budget.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxWidth: '360px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              required
              placeholder="rider@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 18px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #ff8c00 0%, #c97200 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: 'pointer',
              }}
            >
              Get My Masterplan 🏍️
            </button>
            <p style={{ color: '#374151', fontSize: '11px', margin: 0, textAlign: 'center' }}>
              Zero spam. Hardcore riding advice only.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Step wizard ────────────────────────────────────────────────────────────
  const step = steps[currentStep];
  const isTwoCol = step.options.length === 4;

  return (
    <div style={WIDGET_WRAP}>
      {/* Header */}
      <div style={HEADER_BAR}>
        <div style={HEADER_LEFT}>
          <div style={BRAND_DOT} />
          <span style={BRAND_LABEL}>AI Trip Builder</span>
        </div>
        <ProgressDots />
      </div>

      {/* Previous selections */}
      <SelectionBreadcrumb />

      {/* Question */}
      <div style={STEP_BODY}>
        <p style={QUESTION_LABEL}>Step {currentStep + 1} of 3</p>
        <h2 style={QUESTION_HEADING}>{step.question}</h2>
        <p style={QUESTION_DESC}>{step.description}</p>
      </div>

      {/* Options */}
      <div style={OPTIONS_GRID(isTwoCol ? 2 : 1)}>
        {step.options.map((option) => {
          const isHovered = hovered === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHovered(option.value)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...OPTION_BTN,
                background: isHovered ? 'rgba(255,140,0,0.07)' : 'rgba(255,255,255,0.04)',
                borderColor: isHovered ? 'rgba(255,140,0,0.4)' : 'rgba(255,255,255,0.07)',
                transform: isHovered ? 'translateY(-2px)' : 'none',
              }}
            >
              <span style={{ fontSize: '26px', flexShrink: 0, lineHeight: 1 }}>{option.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: isHovered ? '#ff8c00' : '#fff',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: 1.2,
                    transition: 'color 0.14s',
                  }}
                >
                  {option.label}
                </div>
                {option.sub && (
                  <div style={{ color: '#4b5563', fontSize: '12px', marginTop: '2px' }}>
                    {option.sub}
                  </div>
                )}
              </div>
              <div
                style={{
                  color: isHovered ? '#ff8c00' : '#1f2937',
                  fontSize: '18px',
                  flexShrink: 0,
                  transition: 'color 0.14s, transform 0.14s',
                  transform: isHovered ? 'translateX(3px)' : 'none',
                }}
              >
                ›
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
