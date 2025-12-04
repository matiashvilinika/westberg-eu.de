"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date("2025-12-16T00:00:00").getTime();

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
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
      </div>

      {/* Rotating Earth - Positioned at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%]">
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
        <div className="mb-8 text-center">
          <p className="text-sm text-white/40 md:text-base">Launch Date</p>
          <p className="text-xl font-semibold text-cyan-400 md:text-2xl">December 16, 2025</p>
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
            <button className="whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25">
              Notify Me
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Stars Animation */
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23ffffff" cx="50" cy="50" r="1"/></svg>') repeat;
          background-size: 100px 100px;
          animation: animateStars 100s linear infinite;
        }

        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23ffffff" cx="30" cy="70" r="0.8"/></svg>') repeat;
          background-size: 150px 150px;
          animation: animateStars 150s linear infinite;
          opacity: 0.5;
        }

        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23ffffff" cx="70" cy="30" r="0.5"/></svg>') repeat;
          background-size: 200px 200px;
          animation: animateStars 200s linear infinite;
          opacity: 0.3;
        }

        @keyframes animateStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
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

        /* Earth Sphere */
        .earth {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: 
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.9) 0%,
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.9) 100%
            ),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png');
          background-size: cover, 200% 100%;
          background-position: center, 0 0;
          box-shadow: 
            inset -100px -50px 150px rgba(0, 0, 0, 0.9),
            inset 30px 30px 60px rgba(100, 200, 255, 0.15),
            0 0 150px rgba(100, 200, 255, 0.4),
            0 0 300px rgba(50, 150, 255, 0.2);
          animation: rotateEarth 30s linear infinite;
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

        @keyframes rotateEarth {
          from {
            background-position: center, 0 0;
          }
          to {
            background-position: center, 200% 0;
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
