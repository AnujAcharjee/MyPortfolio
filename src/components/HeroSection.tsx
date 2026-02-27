import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="hidden md:flex items-start w-full gap-6 h-screen px-6 py-4 bg-[#0d1117] border-b border-white/10">
      {/* Left section */}
      <div className="w-1/3 h-auto flex flex-col items-center justify-center">
        <Image src="/avatar.jpeg" alt="User avatar" width={250} height={250} className="rounded-full" />

        <div className='my-5'>
          <p className="font-sans font-bold text-xl">Anuj</p>
          <p className='font-extralight text-gray-500'>AnujAcharjee · he/him </p> 
          <p className=''></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 h-auto border"></div>
    </div>
  );
}
