import Image from 'next/image';
import { ImgLink } from '@/constants/imageLinks';
import { SocialSection } from '@/components/hero/SocialSection';

export default function HeroSection() {
  return (
    <section
      className="
        relative flex flex-col items-center lg:items-start
        gap-8 px-4 py-8 sm:py-14 lg:py-10
        overflow-hidden
      "
    >
      {/* Avatar + Intro */}
      <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5">
        {/* Avatar */}
        <div className="relative rounded-full shrink-0">
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl scale-110" />
          <Image
            src={ImgLink.avatar}
            alt="Anuj Acharjee"
            width={150}
            height={150}
            className="
              relative rounded-full
              w-24 h-24 sm:w-32 sm:h-32 lg:w-20 lg:h-20
              object-cover
              ring-2 ring-white/10
              shadow-2xl shadow-black/60
            "
            priority
          />
        </div>

        {/* Intro */}
        <div className="flex flex-col gap-1.5 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-2xl font-bold tracking-tight text-white leading-tight">
            Hyy I&apos;m Anuj
          </h1>
          <p className="text-sm sm:text-base text-white/50 tracking-wide">
            a software dev
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-6 w-full max-w-sm text-left">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-green-700">About</h3>
          <p className="text-base text-white/60 leading-relaxed">
            im a CS undergrad who builds stuff — mostly backend systems.
            love solving DSA and contributing to open source whenever i can.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-green-700">Beyond Tech</h3>
          <p className="text-base text-white/60 leading-relaxed">
            when im afk, you&apos;ll probably find me watching football,
            reading a book or playing chess once in a while.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-sm h-px bg-white/5" />

      {/* Socials */}
      <SocialSection />
    </section>
  );
}

