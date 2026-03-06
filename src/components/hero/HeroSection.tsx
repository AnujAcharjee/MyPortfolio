import Image from 'next/image';
import { ImgLink } from '@/constants/imageLinks';
import { SOCIAL_LINKS } from '@/constants/socialLinks';
import { MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center">
      <Image src={ImgLink.avatar} alt="User avatar" width={250} height={250} className="rounded-full" />

      <div className="my-5 font-sans pb-2 border-b border-white/30">
        <p className="font-bold text-3xl">
          Anuj
          <i className="bi bi-patch-check-fill px-2 text-2xl bg-linear-to-br from-white via-yellow-400 to-amber-500/80 bg-clip-text text-transparent hover:shadow-amber-400"></i>
        </p>
        <p className="font-mono text-gray-500">AnujAcharjee · he/him</p>
        <p className="flex gap-x-1 justify-center items-center font-mono text-gray-500">
          <MapPin size={14} />
          India
        </p>

        <p className="mt-4">I make full-stack products that people love using.</p>
        <p>I play, read, and drink coffee for fun.</p>

        <p className="mt-4 font-mono text-sm text-gray-500">
          Developer · OSS contributor · Indie hacker · Student
        </p>
      </div>

      <div className="flex gap-8 text-3xl">
        {SOCIAL_LINKS.map((item, index) =>
          item.url ?
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition"
            >
              <i className={item.icon} />
            </a>
          : <div key={index} className="text-gray-500 cursor-not-allowed">
              <i className={item.icon} />
            </div>,
        )}
      </div>
    </section>
  );
}
