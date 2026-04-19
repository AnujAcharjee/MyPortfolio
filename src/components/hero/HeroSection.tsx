import Image from 'next/image';
import { ImgLink } from '@/constants/imageLinks';
import { MapPin } from 'lucide-react';
import { SocialSection } from '@/components/hero/SocialSection';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section
      className="
      relative flex flex-col items-center justify-center gap-3 text-center
      px-4 py-6 sm:py-12 md:py-15 sm:min-h-0
      overflow-hidden
    "
    >
      {/* Avatar */}
      <div className="relative rounded-full">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-110" />

        {/* Gradient border ring */}
        <div
          className="absolute inset-0 rounded-full p-0.5"
          style={{
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(139,92,246,0.3), rgba(59,130,246,0.1))',
            borderRadius: '9999px',
          }}
        />

        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        {/* Avatar */}
        <Image
          src={ImgLink.avatar}
          alt="avatar"
          width={150}
          height={150}
          className="
            relative rounded-full
            w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48
            object-cover
            ring-2 ring-white/10
            shadow-2xl shadow-black/60
          "
          priority
        />
      </div>

      <div className="flex flex-col gap-6 my-6 pb-4 border-b border-white/10 font-sans">
        <div className="flex flex-col gap-1.5 items-center text-center">
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-white/30 tracking-widest italic">hi there!</span>
              <span className="text-base">👋</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-none">
              <span className="text-white/30 font-light">{"I'm "}</span>Anuj Acharjee
            </h1>
          </div>

          <div className="flex items-center justify-center gap-1.5 font-mono text-white/40 mt-5">
            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs tracking-wide">India</span>
          </div>
        </div>

        <div className="text-center text-sm sm:text-[15px] text-white/55 leading-relaxed tracking-wide max-w-xs sm:max-w-sm mx-auto">
          <p className="font-light">I make full-stack products that people love using.</p>
          <p className="font-semibold">Developer · OSS contributor · Indie hacker · Student</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <SocialSection />

        {/* Resume link */}
        {/* <a
          href=""
          id="resume"
          className="
          mt-3
          font-mono text-xs sm:text-sm
          text-orange-400 hover:text-orange-200
          underline underline-offset-4
          decoration-orange-600 hover:decoration-orange-400
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-orange-400/60 rounded
        "
        >
          Resume ↗
        </a> */}
      </div>
    </section>
  );
}
