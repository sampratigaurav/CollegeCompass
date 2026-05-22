import React from 'react';
import { Building2 } from 'lucide-react';

interface FallbackImageProps {
  name: string;
  className?: string;
}

export function FallbackImage({ name, className = "" }: FallbackImageProps) {
  // Extract initials (e.g., "Indian Institute of Technology" -> "IIT")
  const words = name.split(' ');
  let initials = '';
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    initials = words[0].substring(0, 2).toUpperCase();
  } else {
    initials = 'CC';
  }

  // Pick a stable but varied hue based on the name length
  const hue = (name.length * 15) % 360;

  return (
    <div 
      className={`relative overflow-hidden bg-card flex items-center justify-center isolate ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 20%, 15%), hsl(${(hue + 40) % 360}, 30%, 10%))`
      }}
    >
      {/* Animated Mesh Gradients */}
      <div 
        className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30 mix-blend-screen blur-3xl animate-blob"
        style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }}
      />
      <div 
        className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-20 mix-blend-screen blur-3xl animate-blob animation-delay-2000"
        style={{ backgroundColor: `hsl(${(hue + 60) % 360}, 70%, 50%)` }}
      />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
          <Building2 className="h-6 w-6 text-white/70" />
        </div>
        <span className="text-sm font-bold tracking-widest text-white/50 uppercase">
          {initials}
        </span>
      </div>
    </div>
  );
}
