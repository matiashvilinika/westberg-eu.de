"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Star {
  id: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
  delay: number;
  duration: number;
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  
  // Generate stars once and keep them fixed
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, []); // Empty dependency array means this runs once

  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date("2025-12-30T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#030014]" />
    );
  }

  return (
    <div className="fixed inset-0 bg-[#030014] overflow-hidden">
      {/* Stars Background - Fixed positions, gently twinkling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating Earth - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="earth-container">
          <div className="earth" />
          <div className="earth-glow" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo/logo-dark.svg"
            alt="Westberg Europe Logo"
            width={320}
            height={80}
            className="h-auto w-[250px] md:w-[320px] lg:w-[400px]"
            priority
          />
        </div>

        {/* Coming Soon Text */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-light tracking-[0.3em] text-white/90 md:text-3xl lg:text-4xl">
            COMING SOON
          </h2>
          <p className="max-w-lg text-base text-white/60 md:text-lg">
            Something extraordinary is on its way. Get ready for launch.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8 flex gap-3 md:gap-6">
          <TimeBlock value={timeLeft.days} label="DAYS" />
          <TimeBlock value={timeLeft.hours} label="HOURS" />
          <TimeBlock value={timeLeft.minutes} label="MINUTES" />
          <TimeBlock value={timeLeft.seconds} label="SECONDS" />
        </div>

        {/* Launch Date */}
        <div className="text-center">
          <p className="text-sm text-white/40 md:text-base">Launch Date</p>
          <p className="text-xl font-semibold text-cyan-400 md:text-2xl">December 30, 2025</p>
        </div>
      </div>

      <style jsx>{`
        /* Gentle Twinkle Animation - Stars stay in place */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        /* Earth Container */
        .earth-container {
          position: relative;
          width: 900px;
          height: 900px;
        }

        @media (max-width: 1024px) {
          .earth-container {
            width: 700px;
            height: 700px;
          }
        }

        @media (max-width: 768px) {
          .earth-container {
            width: 500px;
            height: 500px;
          }
        }

        /* Real Earth Image */
        .earth {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          transform: translate(-50%, -50%);
          box-shadow: 
            inset -80px -40px 120px rgba(0, 0, 0, 0.7),
            inset 25px 25px 50px rgba(100, 200, 255, 0.15),
            0 0 120px rgba(100, 200, 255, 0.4),
            0 0 250px rgba(50, 150, 255, 0.25);
        }
        
        /* Rotating Earth Image */
        .earth::before {
          content: '';
          position: absolute;
          inset: -10%;
          background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png') center/cover no-repeat;
          animation: rotateEarthSurface 60s linear infinite;
        }
        
        /* Light/Shadow overlay */
        .earth::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: 
            radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25) 0%, transparent 45%),
            radial-gradient(circle at 70% 70%, rgba(0,0,0,0.5) 0%, transparent 50%);
        }

        /* Earth Glow Effect */
        .earth-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 115%;
          height: 115%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(100, 200, 255, 0.3) 0%,
            rgba(50, 150, 255, 0.1) 30%,
            transparent 60%
          );
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes rotateEarthSurface {
          0% {
            transform: rotate(0deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-20 sm:w-20 md:h-24 md:w-24">
          <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl tabular-nums">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur" />
      </div>
      <span className="mt-2 text-[10px] font-medium tracking-wider text-white/50 sm:text-xs">
        {label}
      </span>
    </div>
  );
}
