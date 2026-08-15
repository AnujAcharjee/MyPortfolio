const LINKS = {
  nav: [
    { label: 'Pinned', href: '#pinned' },
    { label: 'Projects', href: '#work' },
    { label: 'Toolkit', href: '#skills' },
  ],
};

export default function Navbar({ numRepos }: { numRepos: number }) {
  return (
    <header className="hidden sm:block sticky top-0 z-50 w-full bg-[#010313]/70 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center h-14">
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {LINKS.nav.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="
                text-xs sm:text-sm font-medium text-white/60 hover:text-white
                px-3 py-1.5 rounded-full hover:bg-white/5
                transition-all duration-200 ease-out
              "
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
