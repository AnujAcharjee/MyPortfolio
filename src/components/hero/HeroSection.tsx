import Image from 'next/image';
import { ImgLink } from '@/constants/imageLinks';
import { MapPin } from 'lucide-react';
import { SocialSection } from '@/components/hero/SocialSection';

export default function HeroSection() {
  return (
    <section
      className="
      relative flex flex-col items-center justify-center text-center
      px-4 py-6 sm:py-12 md:py-15 sm:min-h-0
      overflow-hidden
    "
    >
      {/* Subtle ambient glow behind avatar */}

      {/* Avatar */}
      <div className="relative mb-6 sm:mb-8">
        <div
          className="
          absolute inset-0 rounded-full
          bg-linear-to-br from-blue-400/40 via-cyan-400/25 to-transparent
          blur-md scale-110
        "
        />

        <Image
          src={ImgLink.avatar}
          alt="Anuj's avatar"
          width={200}
          height={200}
          className="
            relative rounded-full
            w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48
            object-cover
            ring-2 ring-white/10
            shadow-2xl shadow-black/40
          "
          priority
        />
      </div>

      <div className="flex flex-col gap-4 my-5 font-sans pb-2 border-b border-white/30">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl">
            Anuj Acharjee
            {/* <i className="bi bi-patch-check-fill px-2 text-2xl bg-linear-to-br from-white via-yellow-400 to-amber-500/80 bg-clip-text text-transparent hover:shadow-amber-400"></i> */}
          </p>
          <div className="flex items-center justify-center gap-4 font-mono text-gray-500">
            he/him
            <span className="flex items-center justify-center gap-1">
              <MapPin size={14} />
              India
            </span>
          </div>
        </div>

        <div className="text-xs sm:text-base">
          <p>I make full-stack products that people love using.</p>
          <p>I play, read, and drink coffee for fun.</p>
        </div>

        <p className="font-mono text-xs sm:text-sm text-gray-500">
          Developer · OSS contributor · Indie hacker · Student
        </p>
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
